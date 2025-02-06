export interface CourseContent {
  id: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'expert';
  lastUpdated: string;
}

export interface ProgressData {
  userId: string;
  courseId: string;
  progress: number;
  lastSynced: string;
}

class OfflineStorageService {
  private readonly CONTENT_KEY = 'offline_course_content';
  private readonly PROGRESS_KEY = 'offline_progress';
  private readonly SYNC_STATUS_KEY = 'offline_sync_status';

  // Content Management
  async saveContent(content: CourseContent): Promise<void> {
    try {
      const existingContent = await this.getAllContent();
      const updatedContent = {
        ...existingContent,
        [content.id]: {
          ...content,
          lastUpdated: new Date().toISOString()
        }
      };
      await localStorage.setItem(this.CONTENT_KEY, JSON.stringify(updatedContent));
    } catch (error) {
      console.error('Error saving offline content:', error);
      throw error;
    }
  }

  async getContent(contentId: string): Promise<CourseContent | null> {
    try {
      const allContent = await this.getAllContent();
      return allContent[contentId] || null;
    } catch (error) {
      console.error('Error getting offline content:', error);
      return null;
    }
  }

  async getAllContent(): Promise<Record<string, CourseContent>> {
    try {
      const content = localStorage.getItem(this.CONTENT_KEY);
      return content ? JSON.parse(content) : {};
    } catch (error) {
      console.error('Error getting all offline content:', error);
      return {};
    }
  }

  // Progress Tracking
  async saveProgress(progress: ProgressData): Promise<void> {
    try {
      const existingProgress = await this.getAllProgress();
      const progressKey = `${progress.userId}_${progress.courseId}`;
      const updatedProgress = {
        ...existingProgress,
        [progressKey]: {
          ...progress,
          lastSynced: new Date().toISOString()
        }
      };
      await localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(updatedProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  }

  async getProgress(userId: string, courseId: string): Promise<ProgressData | null> {
    try {
      const allProgress = await this.getAllProgress();
      const progressKey = `${userId}_${courseId}`;
      return allProgress[progressKey] || null;
    } catch (error) {
      console.error('Error getting progress:', error);
      return null;
    }
  }

  async getAllProgress(): Promise<Record<string, ProgressData>> {
    try {
      const progress = localStorage.getItem(this.PROGRESS_KEY);
      return progress ? JSON.parse(progress) : {};
    } catch (error) {
      console.error('Error getting all progress:', error);
      return {};
    }
  }

  // Sync Status Management
  async markForSync(type: 'content' | 'progress', id: string): Promise<void> {
    try {
      const syncStatus = await this.getSyncStatus();
      const updatedStatus = {
        ...syncStatus,
        [type]: {
          ...syncStatus[type],
          [id]: new Date().toISOString()
        }
      };
      await localStorage.setItem(this.SYNC_STATUS_KEY, JSON.stringify(updatedStatus));
    } catch (error) {
      console.error('Error marking for sync:', error);
      throw error;
    }
  }

  async getPendingSyncs(): Promise<{
    content: Record<string, string>,
    progress: Record<string, string>
  }> {
    try {
      const syncStatus = await this.getSyncStatus();
      return syncStatus;
    } catch (error) {
      console.error('Error getting pending syncs:', error);
      return { content: {}, progress: {} };
    }
  }

  private async getSyncStatus(): Promise<{
    content: Record<string, string>,
    progress: Record<string, string>
  }> {
    try {
      const status = localStorage.getItem(this.SYNC_STATUS_KEY);
      return status ? JSON.parse(status) : { content: {}, progress: {} };
    } catch (error) {
      console.error('Error getting sync status:', error);
      return { content: {}, progress: {} };
    }
  }

  // Clear specific data
  async clearContent(contentId: string): Promise<void> {
    try {
      const allContent = await this.getAllContent();
      delete allContent[contentId];
      await localStorage.setItem(this.CONTENT_KEY, JSON.stringify(allContent));
    } catch (error) {
      console.error('Error clearing content:', error);
      throw error;
    }
  }

  async clearProgress(userId: string, courseId: string): Promise<void> {
    try {
      const allProgress = await this.getAllProgress();
      const progressKey = `${userId}_${courseId}`;
      delete allProgress[progressKey];
      await localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error clearing progress:', error);
      throw error;
    }
  }
}

export const offlineStorage = new OfflineStorageService();
