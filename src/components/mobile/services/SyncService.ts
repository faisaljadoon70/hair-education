import { supabase } from '@/utils/supabase-client';
import { offlineStorage, CourseContent, ProgressData } from './OfflineStorageService';

class SyncService {
  private syncInProgress = false;

  // Check online status
  private isOnline(): boolean {
    return navigator.onLine;
  }

  // Sync content to server
  private async syncContentToServer(contentId: string, content: CourseContent): Promise<void> {
    try {
      const { error } = await supabase
        .from('course_content')
        .upsert({
          id: contentId,
          title: content.title,
          content: content.content,
          level: content.level,
          last_updated: content.lastUpdated
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error syncing content to server:', error);
      await offlineStorage.markForSync('content', contentId);
      throw error;
    }
  }

  // Sync progress to server
  private async syncProgressToServer(userId: string, courseId: string, progress: ProgressData): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          progress: progress.progress,
          last_synced: progress.lastSynced
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error syncing progress to server:', error);
      await offlineStorage.markForSync('progress', `${userId}_${courseId}`);
      throw error;
    }
  }

  // Download content from server
  private async downloadContent(contentId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('course_content')
        .select('*')
        .eq('id', contentId)
        .single();

      if (error) throw error;
      if (data) {
        await offlineStorage.saveContent({
          id: data.id,
          title: data.title,
          content: data.content,
          level: data.level,
          lastUpdated: data.last_updated
        });
      }
    } catch (error) {
      console.error('Error downloading content:', error);
      throw error;
    }
  }

  // Download progress from server
  private async downloadProgress(userId: string, courseId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (error) throw error;
      if (data) {
        await offlineStorage.saveProgress({
          userId: data.user_id,
          courseId: data.course_id,
          progress: data.progress,
          lastSynced: data.last_synced
        });
      }
    } catch (error) {
      console.error('Error downloading progress:', error);
      throw error;
    }
  }

  // Sync all pending changes
  async syncAll(): Promise<void> {
    if (this.syncInProgress || !this.isOnline()) return;

    try {
      this.syncInProgress = true;
      const pendingSyncs = await offlineStorage.getPendingSyncs();

      // Sync content
      for (const [contentId, _] of Object.entries(pendingSyncs.content)) {
        const content = await offlineStorage.getContent(contentId);
        if (content) {
          await this.syncContentToServer(contentId, content);
        }
      }

      // Sync progress
      for (const [progressKey, _] of Object.entries(pendingSyncs.progress)) {
        const [userId, courseId] = progressKey.split('_');
        const progress = await offlineStorage.getProgress(userId, courseId);
        if (progress) {
          await this.syncProgressToServer(userId, courseId, progress);
        }
      }
    } catch (error) {
      console.error('Error during sync:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  // Download course content for offline use
  async downloadCourseContent(contentIds: string[]): Promise<void> {
    if (!this.isOnline()) throw new Error('No internet connection');

    try {
      for (const contentId of contentIds) {
        await this.downloadContent(contentId);
      }
    } catch (error) {
      console.error('Error downloading course content:', error);
      throw error;
    }
  }

  // Initialize sync listeners
  initSyncListeners(): void {
    window.addEventListener('online', () => {
      this.syncAll();
    });

    // Attempt to sync periodically when online
    setInterval(() => {
      if (this.isOnline()) {
        this.syncAll();
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }
}

export const syncService = new SyncService();
