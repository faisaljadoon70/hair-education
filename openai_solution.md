# Complete Mobile Optimization Solution

## Combined Best Solutions from OpenAI and DeepSeek

### 1. Device Detection & Middleware

#### OpenAI's Solution
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type || 'desktop';

  const response = NextResponse.next();
  response.headers.set('X-Device-Type', deviceType);
  return response;
}
```

#### DeepSeek's Enhancement
```typescript
// Added bot detection and better error handling
export function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type || 'desktop';
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);

  const response = NextResponse.next();
  response.headers.set('X-Device-Type', deviceType);
  response.headers.set('X-Is-Bot', String(isBot));
  return response;
}
```

### 2. PDF Processing Strategy

#### Device-Specific PDF Viewers
```typescript
// components/PDFContainer.tsx
import { useDevice } from '@/hooks/useDevice';
import DesktopPDFViewer from '@/components/DesktopPDFViewer';
import MobilePDFViewer from '@/components/MobilePDFViewer';

export default function PDFContainer({ pdfUrl }) {
  const deviceType = useDevice();
  return deviceType === 'mobile' ? (
    <MobilePDFViewer pdfUrl={pdfUrl} />
  ) : (
    <DesktopPDFViewer pdfUrl={pdfUrl} />
  );
}

// Mobile-optimized viewer (memory efficient)
export function MobilePDFViewer({ pdfUrl }) {
  return (
    <Document file={pdfUrl} options={{ workerSrc: '/pdf.worker.js' }}>
      <Page pageNumber={1} renderMode="canvas" />
    </Document>
  );
}

// Desktop-optimized viewer (better quality)
export function DesktopPDFViewer({ pdfUrl }) {
  return (
    <Document file={pdfUrl}>
      {[1, 2, 3].map((page) => (
        <Page key={page} pageNumber={page} renderMode="svg" />
      ))}
    </Document>
  );
}
```

### 3. Database Sync Strategy

#### Device-Aware Caching
```typescript
// utils/cacheConfig.ts
export function getCacheConfig() {
  const deviceType = useDevice();
  return deviceType === 'mobile'
    ? { maxEntries: 50, retention: '1h' }
    ? { maxEntries: 200, retention: '3h' };
}

// utils/syncStrategy.ts
async function syncWithDeviceAdaptation(data) {
  const deviceType = useDevice();
  const batchSize = deviceType === 'mobile' ? 5 : 20;

  for (let i = 0; i < data.length; i += batchSize) {
    await supabase.from('images').insert(data.slice(i, i + batchSize));
  }
}
```

### 4. Touch & Gesture Support

#### Enhanced Touch Controls
```typescript
// components/TouchControls.tsx
import { useGesture } from '@use-gesture/react';

export default function MobilePDFControls({ zoom, setZoom }) {
  const bind = useGesture({
    onPinch: ({ offset: [scale] }) => setZoom(scale),
    onWheel: ({ movement: [, dy] }) => setZoom((prev) => Math.max(prev - dy * 0.01, 1)),
  });

  return <div {...bind()} className="pdf-touch-container" />;
}
```

### 5. Error Handling & Performance

#### Device-Specific Error Boundaries
```typescript
// components/ErrorBoundary.tsx
export function ErrorBoundary({ children }) {
  const deviceType = useDevice();

  return (
    <ErrorBoundaryComponent
      fallback={
        <p>
          {deviceType === 'mobile' 
            ? 'Something went wrong' 
            : 'Detailed error message'}
        </p>
      }
    >
      {children}
    </ErrorBoundaryComponent>
  );
}
```

### 6. State Management Integration

#### Device-Aware Zustand Store
```typescript
// store/deviceStore.ts
import { create } from 'zustand';
import { useDevice } from '@/hooks/useDevice';

const useAppStore = create((set) => ({
  deviceType: 'desktop',
  setDevice: (type) => set({ deviceType: type }),
}));

export function DeviceStateInitializer() {
  const deviceType = useDevice();
  useAppStore.setState({ deviceType });
  return null;
}
```

### 7. Performance Monitoring

#### Web Vitals Integration
```typescript
// utils/performance.ts
import { getCLS, getFID, getLCP } from 'web-vitals';

export function reportWebVitals({ id, name, value }) {
  // Analytics implementation
  console.log(name, value);
}

// Monitor Core Web Vitals
getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);

// Custom performance metrics
export function trackPDFPerformance(timing) {
  const metrics = {
    loadTime: timing.loadEnd - timing.loadStart,
    renderTime: timing.renderEnd - timing.renderStart,
    memoryUsage: performance.memory?.usedJSHeapSize,
  };
  reportWebVitals(metrics);
}
```

### 8. SEO Optimization

#### Server-Side Props
```typescript
// pages/[...slug].tsx
export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);

  return {
    props: {
      isMobile,
      deviceType: isMobile ? 'mobile' : 'desktop',
    },
  };
}
```

#### Meta Tags Management
```typescript
// components/SEOHead.tsx
export function SEOHead({ deviceType }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="alternate" media="only screen and (max-width: 640px)" href="/mobile" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
```

### 9. Offline Queue Management

#### Queue Implementation
```typescript
// utils/offlineQueue.ts
interface QueueItem {
  id: string;
  operation: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
  retryCount: number;
}

export const offlineQueue = create<QueueStore>((set) => ({
  queue: [] as QueueItem[],
  addToQueue: (item: QueueItem) => set((state) => ({
    queue: [...state.queue, { ...item, timestamp: Date.now() }]
  })),
  removeFromQueue: (id: string) => set((state) => ({
    queue: state.queue.filter(item => item.id !== id)
  })),
  retryItem: (id: string) => set((state) => ({
    queue: state.queue.map(item => 
      item.id === id 
        ? { ...item, retryCount: item.retryCount + 1 }
        : item
    )
  }))
}));

// Retry logic
export async function processQueue() {
  const { queue } = offlineQueue.getState();
  for (const item of queue) {
    try {
      if (item.retryCount > 3) continue;
      await syncItem(item);
      offlineQueue.getState().removeFromQueue(item.id);
    } catch (error) {
      offlineQueue.getState().retryItem(item.id);
    }
  }
}
```

#### Conflict Resolution
```typescript
// utils/conflictResolver.ts
export async function resolveConflict(localItem: any, serverItem: any) {
  const localTimestamp = new Date(localItem.updatedAt).getTime();
  const serverTimestamp = new Date(serverItem.updatedAt).getTime();
  
  return localTimestamp > serverTimestamp ? localItem : serverItem;
}
```

### 10. Memory Management

#### Retention Policy
```typescript
// utils/memoryCleanup.ts
interface CleanupConfig {
  maxAge: number; // 3 hours in milliseconds
  checkInterval: number; // Check every hour
}

const config: CleanupConfig = {
  maxAge: 3 * 60 * 60 * 1000,
  checkInterval: 60 * 60 * 1000
};

export function initMemoryCleanup() {
  // Check for items to cleanup
  setInterval(async () => {
    const now = Date.now();
    const items = await getAllItems();
    
    for (const item of items) {
      const age = now - new Date(item.timestamp).getTime();
      if (age > config.maxAge) {
        await removeItem(item.id);
      }
    }
  }, config.checkInterval);
}

// Memory monitoring
export function monitorMemoryUsage() {
  if (performance.memory) {
    const usage = {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };

    if (usage.used / usage.total > 0.9) {
      // Trigger immediate cleanup
      cleanupOldItems();
    }
  }
}
```

#### Cleanup Implementation
```typescript
// utils/cleanup.ts
export async function cleanupOldItems() {
  const stores = ['images', 'solverData'];
  const now = Date.now();
  
  for (const store of stores) {
    const db = await openDB('appDB', 1);
    const tx = db.transaction(store, 'readwrite');
    const items = await tx.store.getAll();
    
    for (const item of items) {
      if (now - item.timestamp > config.maxAge) {
        await tx.store.delete(item.id);
      }
    }
  }
}

// Auto-cleanup initialization
export function initAutoCleanup() {
  // Start memory monitoring
  monitorMemoryUsage();
  
  // Initialize cleanup interval
  initMemoryCleanup();
  
  // Listen for low memory events
  window.addEventListener('devicemotion', () => {
    if (performance.memory?.usedJSHeapSize > 0.9 * performance.memory?.jsHeapSizeLimit) {
      cleanupOldItems();
    }
  });
}
```

### 11. Supabase Integration & Dual Database Sync

#### Supabase Client Setup
```typescript
// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Separate clients for image and solver databases
export const imageDB = supabase.from('images');
export const solverDB = supabase.from('solver_data');
```

#### Dual Database Sync Implementation
```typescript
// utils/dualDatabaseSync.ts
interface SyncItem {
  id: string;
  data: any;
  type: 'image' | 'solver';
  timestamp: number;
}

export async function syncToDualDatabase(item: SyncItem) {
  const { id, data, type, timestamp } = item;
  
  try {
    // Start both updates simultaneously
    const [imageResult, solverResult] = await Promise.all([
      // Always update image database
      imageDB.upsert({ 
        id, 
        ...data,
        updated_at: timestamp 
      }),
      
      // Update solver database if needed
      type === 'solver' ? 
        solverDB.upsert({ 
          id, 
          ...data,
          updated_at: timestamp 
        }) : 
        Promise.resolve(null)
    ]);

    // Verify both updates succeeded
    if (imageResult.error) throw imageResult.error;
    if (solverResult?.error) throw solverResult.error;

    return { success: true, id };
  } catch (error) {
    console.error('Dual database sync failed:', error);
    // Add to offline queue for retry
    offlineQueue.getState().addToQueue({
      id,
      operation: 'update',
      data: item,
      timestamp,
      retryCount: 0
    });
    return { success: false, error };
  }
}
```

#### Real-time Subscriptions
```typescript
// utils/realtimeSync.ts
export function initializeRealTimeSync() {
  // Subscribe to image changes
  const imageSubscription = imageDB
    .on('*', (payload) => {
      handleImageChange(payload);
    })
    .subscribe();

  // Subscribe to solver changes
  const solverSubscription = solverDB
    .on('*', (payload) => {
      handleSolverChange(payload);
    })
    .subscribe();

  return () => {
    imageSubscription.unsubscribe();
    solverSubscription.unsubscribe();
  };
}

// Handle real-time updates
async function handleImageChange(payload: any) {
  const { new: newData, old: oldData, eventType } = payload;
  
  switch (eventType) {
    case 'INSERT':
    case 'UPDATE':
      await updateLocalImage(newData);
      break;
    case 'DELETE':
      await deleteLocalImage(oldData.id);
      break;
  }
}

async function handleSolverChange(payload: any) {
  const { new: newData, old: oldData, eventType } = payload;
  
  switch (eventType) {
    case 'INSERT':
    case 'UPDATE':
      await updateLocalSolver(newData);
      break;
    case 'DELETE':
      await deleteLocalSolver(oldData.id);
      break;
  }
}
```

#### Error Handling and Retry Logic
```typescript
// utils/syncErrorHandling.ts
export async function handleSyncError(error: any, item: SyncItem) {
  // Log error with context
  console.error('Sync error:', {
    error,
    item,
    timestamp: new Date().toISOString()
  });

  // Add to offline queue with priority
  offlineQueue.getState().addToQueue({
    ...item,
    priority: item.type === 'image' ? 'high' : 'normal',
    retryCount: 0
  });

  // Notify user if online
  if (navigator.onLine) {
    notifyUser('Sync failed. Will retry automatically.');
  }

  // Schedule immediate retry if online
  if (navigator.onLine) {
    setTimeout(() => {
      processQueue();
    }, 5000); // Retry after 5 seconds
  }
}

// Sync status tracking
export const syncStatus = create<SyncStatus>((set) => ({
  lastSync: null,
  syncInProgress: false,
  errors: [],
  setSyncStatus: (status) => set(status),
  addError: (error) => set((state) => ({
    errors: [...state.errors, error]
  })),
  clearErrors: () => set({ errors: [] })
}));
```

### 12. Immediate Image Upload & Solver Validation

#### Immediate Image Upload Handler
```typescript
// utils/immediateImageUpload.ts
interface ImageUploadResult {
  success: boolean;
  imageId?: string;
  error?: string;
}

export async function handleImmediateImageUpload(imageData: File | Blob): Promise<ImageUploadResult> {
  try {
    // 1. Validate image
    if (!isValidImage(imageData)) {
      throw new Error('Invalid image format');
    }

    // 2. Generate unique ID
    const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 3. Upload to image database immediately
    const { error: uploadError } = await imageDB.insert({
      id: imageId,
      data: await processImageForUpload(imageData),
      uploaded_at: new Date().toISOString(),
      status: 'pending_processing' // Will be processed later
    });

    if (uploadError) throw uploadError;

    // 4. Queue for later processing
    await queueForProcessing({
      id: imageId,
      type: 'image',
      status: 'needs_processing'
    });

    return {
      success: true,
      imageId
    };
  } catch (error) {
    console.error('Immediate image upload failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Image validation
function isValidImage(file: File | Blob): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
}

// Image processing
async function processImageForUpload(file: File | Blob): Promise<Blob> {
  // Compress if needed
  if (file.size > 5 * 1024 * 1024) { // 5MB
    return await compressImage(file);
  }
  return file;
}
```

#### Solver Duplication Check
```typescript
// utils/solverValidation.ts
interface SolverCheckResult {
  exists: boolean;
  existingSolverId?: string;
  similarity?: number;
}

export async function checkExistingSolver(solverData: any): Promise<SolverCheckResult> {
  try {
    // 1. Get all existing solvers
    const { data: existingSolvers, error } = await solverDB
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 2. Check for duplicates
    for (const solver of existingSolvers) {
      const similarity = await calculateSolverSimilarity(solver, solverData);
      if (similarity > 0.85) { // 85% similarity threshold
        return {
          exists: true,
          existingSolverId: solver.id,
          similarity
        };
      }
    }

    return { exists: false };
  } catch (error) {
    console.error('Solver check failed:', error);
    throw error;
  }
}

// Solver creation with validation
export async function createSolverWithValidation(solverData: any) {
  // 1. Check for existing solver
  const checkResult = await checkExistingSolver(solverData);
  
  if (checkResult.exists) {
    return {
      success: false,
      message: 'Similar solver already exists',
      existingSolverId: checkResult.existingSolverId
    };
  }

  // 2. Validate solver data
  if (!isValidSolverData(solverData)) {
    return {
      success: false,
      message: 'Invalid solver data'
    };
  }

  // 3. Create new solver
  try {
    const { data, error } = await solverDB.insert({
      ...solverData,
      created_at: new Date().toISOString()
    });

    if (error) throw error;

    return {
      success: true,
      solverId: data.id
    };
  } catch (error) {
    console.error('Solver creation failed:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

// Solver data validation
function isValidSolverData(data: any): boolean {
  const requiredFields = ['type', 'parameters', 'description'];
  return requiredFields.every(field => data[field] !== undefined);
}

// Calculate similarity between solvers
async function calculateSolverSimilarity(solver1: any, solver2: any): Promise<number> {
  // Compare solver properties
  const typeMatch = solver1.type === solver2.type;
  const paramMatch = compareParameters(solver1.parameters, solver2.parameters);
  const descMatch = compareSolverDescriptions(solver1.description, solver2.description);

  return (typeMatch ? 0.4 : 0) + (paramMatch ? 0.4 : 0) + (descMatch ? 0.2 : 0);
}
```

#### Integration with Main Flow
```typescript
// components/ImageUploader.tsx
export function ImageUploader() {
  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 1. Upload image immediately
    const uploadResult = await handleImmediateImageUpload(file);
    
    if (uploadResult.success) {
      // 2. Show success message
      notifyUser('Image uploaded successfully');
      
      // 3. Queue for processing
      // Processing will happen in background
    } else {
      // Handle error
      notifyUser('Upload failed: ' + uploadResult.error);
    }
  };

  return (
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleImageSelect} 
    />
  );
}

// components/SolverCreator.tsx
export function SolverCreator() {
  const handleSolverCreate = async (solverData: any) => {
    // 1. Check for existing solver
    const result = await createSolverWithValidation(solverData);
    
    if (result.success) {
      notifyUser('Solver created successfully');
    } else if (result.existingSolverId) {
      notifyUser('Similar solver already exists');
      // Show existing solver
      showExistingSolver(result.existingSolverId);
    } else {
      notifyUser('Failed to create solver: ' + result.message);
    }
  };

  return (
    // Solver creation form
  );
}
```

### 13. Image Recognition & Analysis System

#### Main Page Implementation
```typescript
// pages/index.tsx
import { useImageRecognition } from '@/hooks/useImageRecognition';
import { ImageUploader } from '@/components/ImageUploader';
import { AnalysisResults } from '@/components/AnalysisResults';

export default function MainPage() {
  const { 
    analyzeImage, 
    analysisResults, 
    isAnalyzing 
  } = useImageRecognition();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">
        Hair Education Analysis Portal
      </h1>
      
      {/* Image Input Section */}
      <section className="mb-8">
        <ImageUploader 
          onImageSelected={async (file) => {
            // 1. Immediate upload to image DB
            const uploadResult = await handleImmediateImageUpload(file);
            
            if (uploadResult.success) {
              // 2. Start analysis
              await analyzeImage(uploadResult.imageId);
            }
          }}
        />
      </section>

      {/* Analysis Results */}
      {isAnalyzing ? (
        <AnalysisProgress />
      ) : (
        <AnalysisResults results={analysisResults} />
      )}
    </div>
  );
}
```

#### Image Recognition System
```typescript
// hooks/useImageRecognition.ts
import { useState } from 'react';
import { supabase } from '@/utils/supabase';

interface AnalysisResult {
  imageId: string;
  hairType: string;
  recommendations: string[];
  confidence: number;
}

export function useImageRecognition() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  const analyzeImage = async (imageId: string) => {
    setIsAnalyzing(true);
    try {
      // 1. Get image data
      const { data: imageData } = await imageDB
        .select('*')
        .eq('id', imageId)
        .single();

      if (!imageData) throw new Error('Image not found');

      // 2. Run image recognition
      const recognitionResult = await performImageRecognition(imageData);

      // 3. Route to appropriate solver
      const solver = await findAppropiateSolver(recognitionResult.hairType);

      // 4. Generate recommendations
      const recommendations = await generateRecommendations(solver, recognitionResult);

      // 5. Save analysis results
      const result: AnalysisResult = {
        imageId,
        hairType: recognitionResult.hairType,
        recommendations: recommendations,
        confidence: recognitionResult.confidence
      };

      await saveAnalysisResults(result);
      setAnalysisResults(result);

    } catch (error) {
      console.error('Analysis failed:', error);
      notifyUser('Analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeImage,
    analysisResults,
    isAnalyzing
  };
}

// Image recognition core
async function performImageRecognition(imageData: any) {
  // Use embedded recognition model
  const model = await loadRecognitionModel();
  const prediction = await model.predict(imageData);

  return {
    hairType: prediction.class,
    confidence: prediction.confidence
  };
}

// Solver routing
async function findAppropiateSolver(hairType: string) {
  // Check existing solvers first
  const { data: existingSolver } = await solverDB
    .select('*')
    .eq('type', hairType)
    .single();

  if (existingSolver) {
    return existingSolver;
  }

  throw new Error(`No solver found for hair type: ${hairType}`);
}

// Recommendation generation
async function generateRecommendations(solver: any, recognition: any) {
  return solver.generateRecommendations({
    hairType: recognition.hairType,
    confidence: recognition.confidence
  });
}
```

#### Analysis Results Component
```typescript
// components/AnalysisResults.tsx
interface AnalysisResultsProps {
  results: AnalysisResult | null;
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  if (!results) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="mb-4">
        <h3 className="font-medium">Hair Type:</h3>
        <p>{results.hairType}</p>
        <p className="text-sm text-gray-500">
          Confidence: {(results.confidence * 100).toFixed(2)}%
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Recommendations:</h3>
        <ul className="list-disc pl-5">
          {results.recommendations.map((rec, index) => (
            <li key={index} className="mb-2">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

#### Progress Indicator
```typescript
// components/AnalysisProgress.tsx
export function AnalysisProgress() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Analyzing your image...</p>
    </div>
  );
}
```

## Updated Implementation Checklist
1. Device Detection
2. PDF Processing
3. Database Sync
4. Error Handling
5. State Management
6. Touch Support
7. Performance Monitoring
8. SEO Optimization
9. Offline Queue Management
10. Memory Management
11. Supabase Integration
12. Image & Solver Management
13. Image Recognition System
    - Main page implementation
    - Recognition logic
    - Results display
    - Solver routing

## Updated Implementation Checklist
1. Device Detection
2. PDF Processing
3. Database Sync
4. Error Handling
5. State Management
6. Touch Support
7. Performance Monitoring
8. SEO Optimization
9. Offline Queue Management
10. Memory Management
11. Supabase Integration
12. Image & Solver Management
13. Image Recognition System
14. PDF & Image Processing Fixes
    - Fixed process_image()
    - Proper type handling
    - Concurrent database updates
    - Updated tests

### 14. PDF and Image Processing Fixes

#### PDF Processor Fix
```python
# utils/pdf_processor.py
from typing import Tuple, Dict, Any
import fitz  # PyMuPDF

class PDFProcessor:
    def __init__(self):
        self.current_doc = None

    def process_image(self, pdf_path: str, page_num: int, img_idx: int) -> Tuple[bytes, Dict[str, Any]]:
        """
        Process image from PDF with proper error handling and type safety.
        
        Args:
            pdf_path: Path to PDF file
            page_num: Page number (0-based)
            img_idx: Image index in page
            
        Returns:
            Tuple of (image_bytes, metadata)
        """
        try:
            # Open document
            self.current_doc = fitz.open(pdf_path)
            
            # Get page
            page = self.current_doc[page_num]  # Using integer index
            
            # Get image list
            image_list = page.get_images()
            
            if not image_list:
                raise ValueError(f"No images found on page {page_num}")
                
            # Get specific image
            img_info = image_list[img_idx]  # Using integer index
            
            # Extract image using xref
            xref = img_info[0]  # Get xref number
            base_image = self.current_doc.extract_image(xref)
            
            if not base_image:
                raise ValueError(f"Failed to extract image at index {img_idx}")
            
            # Create proper metadata structure
            metadata = {
                'xref': xref,
                'width': base_image.get('width'),
                'height': base_image.get('height'),
                'colorspace': base_image.get('colorspace'),
                'format': base_image.get('ext'),
                'page': page_num,
                'index': img_idx
            }
            
            return base_image['image'], metadata
            
        except Exception as e:
            raise Exception(f"Error processing PDF image: {str(e)}")
            
        finally:
            if self.current_doc:
                self.current_doc.close()
```

#### Image Processor Fix
```python
# utils/image_processor.py
from typing import Dict, Any
import asyncio
from supabase import create_client

class ImageProcessor:
    def __init__(self, supabase_url: str, supabase_key: str):
        self.supabase = create_client(supabase_url, supabase_key)
        self.image_db = self.supabase.table('images')
        self.solver_db = self.supabase.table('solver_data')

    async def process_image(self, image_bytes: bytes, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process image and store in both databases with proper error handling.
        
        Args:
            image_bytes: Raw image data
            metadata: Image metadata
            
        Returns:
            Dict with processing results
        """
        try:
            # Generate unique ID
            image_id = f"img_{metadata['page']}_{metadata['index']}_{metadata.get('xref', '')}"
            
            # Prepare image data
            image_data = {
                'id': image_id,
                'data': image_bytes,
                'metadata': metadata,
                'status': 'processing'
            }
            
            # Update both databases concurrently
            async with asyncio.TaskGroup() as group:
                # Update image database
                group.create_task(
                    self.image_db.upsert(image_data).execute()
                )
                
                # Update solver database with initial entry
                group.create_task(
                    self.solver_db.upsert({
                        'image_id': image_id,
                        'status': 'pending_analysis',
                        'metadata': metadata
                    }).execute()
                )
            
            return {
                'success': True,
                'image_id': image_id,
                'metadata': metadata
            }
            
        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")

    async def update_processing_status(self, image_id: str, status: str) -> None:
        """Update processing status in both databases."""
        try:
            async with asyncio.TaskGroup() as group:
                # Update image database status
                group.create_task(
                    self.image_db.update({'status': status})
                    .eq('id', image_id)
                    .execute()
                )
                
                # Update solver database status
                group.create_task(
                    self.solver_db.update({'status': status})
                    .eq('image_id', image_id)
                    .execute()
                )
                
        except Exception as e:
            raise Exception(f"Error updating status: {str(e)}")
```

#### Tests Update
```python
# tests/test_pdf_processor.py
import pytest
from pathlib import Path
from utils.pdf_processor import PDFProcessor
from utils.image_processor import ImageProcessor

def test_process_image():
    # Setup
    pdf_path = Path("test_data/sample.pdf")
    processor = PDFProcessor()
    
    # Test image extraction
    image_bytes, metadata = processor.process_image(str(pdf_path), 0, 0)
    
    # Verify image data
    assert image_bytes is not None
    assert len(image_bytes) > 0
    
    # Verify metadata structure
    assert isinstance(metadata, dict)
    assert all(key in metadata for key in [
        'xref', 'width', 'height', 'colorspace', 'format', 'page', 'index'
    ])
    
    # Verify types
    assert isinstance(metadata['page'], int)
    assert isinstance(metadata['index'], int)
    assert isinstance(metadata['xref'], int)

@pytest.mark.asyncio
async def test_image_processor():
    # Setup
    processor = ImageProcessor(
        supabase_url="test_url",
        supabase_key="test_key"
    )
    
    # Test data
    image_bytes = b"test_image_data"
    metadata = {
        'page': 0,
        'index': 0,
        'xref': 1,
        'width': 100,
        'height': 100
    }
    
    # Test processing
    result = await processor.process_image(image_bytes, metadata)
    
    # Verify result
    assert result['success']
    assert 'image_id' in result
    assert result['metadata'] == metadata

    # Test status update
    await processor.update_processing_status(result['image_id'], 'completed')
```

## Updated Implementation Checklist
1. Device Detection
2. PDF Processing
3. Database Sync
4. Error Handling
5. State Management
6. Touch Support
7. Performance Monitoring
8. SEO Optimization
9. Offline Queue Management
10. Memory Management
11. Supabase Integration
12. Image & Solver Management
13. Image Recognition System
14. PDF & Image Processing Fixes
    - Fixed process_image()
    - Proper type handling
    - Concurrent database updates
    - Updated tests

### 16. Image History & Retrieval System

#### Image History Manager
```typescript
// utils/ImageHistoryManager.ts
import { supabase } from '@/utils/supabase';

interface ImageRecord {
  id: string;
  url: string;
  timestamp: number;
  metadata: any;
}

export class ImageHistoryManager {
  private static readonly THREE_HOURS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

  constructor(private readonly imageDB = supabase.from('images')) {}

  async findRecentImage(imageHash: string): Promise<ImageRecord | null> {
    const threeHoursAgo = Date.now() - ImageHistoryManager.THREE_HOURS;

    const { data, error } = await this.imageDB
      .select('*')
      .eq('hash', imageHash)
      .gte('created_at', new Date(threeHoursAgo).toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !data?.length) {
      return null;
    }

    return data[0] as ImageRecord;
  }

  async cleanupOldImages(): Promise<void> {
    const threeHoursAgo = new Date(Date.now() - ImageHistoryManager.THREE_HOURS);

    await this.imageDB
      .delete()
      .lt('created_at', threeHoursAgo.toISOString());
  }
}

// utils/imageUtils.ts
import * as crypto from 'crypto';

export async function calculateImageHash(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const hash = crypto
        .createHash('sha256')
        .update(new Uint8Array(buffer))
        .digest('hex');
      resolve(hash);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
```

#### Enhanced Image Upload Hook
```typescript
// hooks/useImageUpload.ts
import { useState } from 'react';
import { ImageHistoryManager } from '@/utils/ImageHistoryManager';
import { calculateImageHash } from '@/utils/imageUtils';

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const historyManager = new ImageHistoryManager();

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      // 1. Calculate image hash
      const imageHash = await calculateImageHash(file);

      // 2. Check recent history (last 3 hours)
      const existingImage = await historyManager.findRecentImage(imageHash);
      
      if (existingImage) {
        // Image found in 3-hour history, return existing
        return {
          success: true,
          imageId: existingImage.id,
          reused: true
        };
      }

      // 3. Upload new image if not found
      const uploadResult = await handleNewImageUpload(file, imageHash);

      // 4. Cleanup old images periodically
      await historyManager.cleanupOldImages();

      return {
        success: true,
        imageId: uploadResult.imageId,
        reused: false
      };

    } catch (error) {
      console.error('Upload failed:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading
  };
}
```

#### Updated Image Input Component
```typescript
// components/ImageInput.tsx
import { useImageUpload } from '@/hooks/useImageUpload';

export function ImageInput({ onImageProcessed }) {
  const { uploadImage, isUploading } = useImageUpload();

  const handleImageReceived = async (file: File) => {
    const result = await uploadImage(file);
    
    if (result.success) {
      if (result.reused) {
        notifyUser('Image found in recent history');
      } else {
        notifyUser('Image uploaded successfully');
      }
      
      onImageProcessed(result.imageId);
    } else {
      notifyUser('Upload failed: ' + result.error);
    }
  };

  // ... rest of the component
}
```

#### Database Schema Update
```sql
-- Update images table for history tracking
ALTER TABLE images
ADD COLUMN hash VARCHAR(64),
ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD INDEX idx_hash_created (hash, created_at);

-- Add cleanup function
CREATE OR REPLACE FUNCTION cleanup_old_images()
RETURNS void AS $$
BEGIN
  DELETE FROM images 
  WHERE created_at < NOW() - INTERVAL '3 hours';
END;
$$ LANGUAGE plpgsql;

-- Add scheduled cleanup (run every hour)
SELECT cron.schedule('0 * * * *', $$
  SELECT cleanup_old_images();
$$);
```

## Updated Implementation Checklist
1. Device Detection
2. PDF Processing
3. Database Sync
4. Error Handling
5. State Management
6. Touch Support
7. Performance Monitoring
8. SEO Optimization
9. Offline Queue Management
10. Memory Management
11. Supabase Integration
12. Image & Solver Management
13. Image Recognition System
14. PDF & Image Processing Fixes
15. Advanced Image Input
16. Image History System
    - 3-hour retention
    - Hash-based lookup
    - Automatic cleanup
    - Reuse detection

### 17. Solver Similarity System

```typescript
// utils/SolverComparison.ts
import { stringSimilarity } from 'string-similarity';

export class SolverComparison {
  private static readonly SIMILARITY_THRESHOLD = 0.85;

  static async compareSolvers(solver1: any, solver2: any): Promise<number> {
    const attributeScores = [
      this.compareAttributes(solver1, solver2),
      this.compareSteps(solver1.steps, solver2.steps),
      this.compareResults(solver1.results, solver2.results)
    ];

    const weights = [0.4, 0.4, 0.2];
    return attributeScores.reduce((sum, score, i) => sum + score * weights[i], 0);
  }

  static async findSimilarSolver(newSolver: any, existingSolvers: any[]): Promise<any> {
    for (const existing of existingSolvers) {
      const similarity = await this.compareSolvers(newSolver, existing);
      if (similarity >= this.SIMILARITY_THRESHOLD) {
        return { similar: true, existingSolver: existing };
      }
    }
    return { similar: false };
  }
}
```

## Updated Implementation Checklist
1. Device Detection
2. PDF Processing
3. Database Sync
4. Error Handling
5. State Management
6. Touch Support
7. Performance Monitoring
8. SEO Optimization
9. Offline Queue Management
10. Memory Management
11. Supabase Integration
12. Image & Solver Management
13. Image Recognition System
14. PDF & Image Processing Fixes
15. Advanced Image Input
16. Image History System
17. Solver Similarity System
    - 85% threshold
    - Weighted comparison
    - Integrated with creation

### 18. Embedded ML Model

```typescript
// utils/ModelLoader.ts
import * as tf from '@tensorflow/tfjs';

export class ModelLoader {
  private static instance: ModelLoader;
  private model: tf.GraphModel | null = null;
  
  static getInstance(): ModelLoader {
    if (!ModelLoader.instance) {
      ModelLoader.instance = new ModelLoader();
    }
    return ModelLoader.instance;
  }

  async loadModel(): Promise<void> {
    if (this.model) return;
    this.model = await tf.loadGraphModel('/model/hair_analysis_model/model.json');
  }
}

// utils/InferenceEngine.ts
export class InferenceEngine {
  private modelLoader: ModelLoader;

  async runInference(imageData: ImageData): Promise<any> {
    const model = this.modelLoader.getModel();
    const preprocessed = await this.preprocessImage(imageData);
    return model.predict(preprocessed);
  }
}

```

### 19. Code Routing System

```typescript
// utils/CodeRouter.ts
import { AnalysisResult } from '@/types';

interface RouteConfig {
  path: string;
  conditions: {
    hairType?: string[];
    confidence?: number;
    features?: string[];
  };
  priority: number;
}

export class CodeRouter {
  private static routes: RouteConfig[] = [
    {
      path: '/advanced/complex-patterns',
      conditions: {
        hairType: ['curly', 'coily'],
        confidence: 0.9,
        features: ['mixed-pattern', 'high-density']
      },
      priority: 1
    },
    {
      path: '/intermediate/styling',
      conditions: {
        hairType: ['wavy', 'straight'],
        features: ['medium-density']
      },
      priority: 2
    },
    {
      path: '/beginner/basics',
      conditions: {
        confidence: 0.7
      },
      priority: 3
    }
  ];

  static findBestRoute(analysis: AnalysisResult): string {
    // Sort routes by priority
    const sortedRoutes = [...this.routes].sort((a, b) => a.priority - b.priority);

    // Find first matching route
    for (const route of sortedRoutes) {
      if (this.matchesConditions(analysis, route.conditions)) {
        return route.path;
      }
    }

    // Default route if no match
    return '/beginner/basics';
  }

  private static matchesConditions(
    analysis: AnalysisResult,
    conditions: RouteConfig['conditions']
  ): boolean {
    // Check hair type
    if (conditions.hairType && 
        !conditions.hairType.includes(analysis.hairType)) {
      return false;
    }

    // Check confidence
    if (conditions.confidence && 
        analysis.confidence < conditions.confidence) {
      return false;
    }

    // Check features
    if (conditions.features && 
        !conditions.features.every(f => analysis.features.includes(f))) {
      return false;
    }

    return true;
  }
}
```

#### Integration with Analysis System
```typescript
// hooks/useAnalysisRouting.ts
import { useRouter } from 'next/router';
import { CodeRouter } from '@/utils/CodeRouter';

export function useAnalysisRouting() {
  const router = useRouter();

  const routeAnalysis = async (analysis: AnalysisResult) => {
    try {
      // 1. Find best matching route
      const route = CodeRouter.findBestRoute(analysis);

      // 2. Save analysis to session
      sessionStorage.setItem('lastAnalysis', JSON.stringify(analysis));

      // 3. Route to appropriate code
      await router.push({
        pathname: route,
        query: {
          analysisId: analysis.id,
          confidence: analysis.confidence
        }
      });

      return { success: true, route };

    } catch (error) {
      console.error('Routing failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  return { routeAnalysis };
}
```

#### Updated Main Page
```typescript
// pages/index.tsx
import { useAnalysisRouting } from '@/hooks/useAnalysisRouting';
import { useImageRecognition } from '@/hooks/useImageRecognition';

export default function MainPage() {
  const { analyzeImage } = useImageRecognition();
  const { routeAnalysis } = useAnalysisRouting();

  const handleImageReceived = async (file: File) => {
    try {
      // 1. Upload image
      const uploadResult = await handleImmediateImageUpload(file);
      
      if (uploadResult.success) {
        // 2. Analyze image
        const analysis = await analyzeImage(uploadResult.imageId);
        
        // 3. Route to appropriate code
        await routeAnalysis(analysis);
      }

    } catch (error) {
      notifyUser('Processing failed: ' + error.message);
    }
  };

  return (
    // ... existing JSX ...
  );
}
```

## Updated Implementation Checklist
1. Device Detection
2. PDF Processing
3. Database Sync
4. Error Handling
5. State Management
6. Touch Support
7. Performance Monitoring
8. SEO Optimization
9. Offline Queue Management
10. Memory Management
11. Supabase Integration
12. Image & Solver Management
13. Image Recognition System
14. PDF & Image Processing Fixes
15. Advanced Image Input
16. Image History System
17. Solver Similarity System
18. Embedded ML Model
19. Code Routing System
    - Route configuration
    - Condition matching
    - Priority handling
    - Analysis routing
