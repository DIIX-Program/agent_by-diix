export class RetryHandler {
  constructor() {
    console.log('[RetryHandler] Module mounted.');
  }

  async executeWithRetry(operation, maxRetries = 3, baseDelayMs = 1000) {
    let attempt = 0;
    
    while (attempt < maxRetries) {
        try {
            return await operation();
        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
                console.error(`[RetryHandler] Operation failed after ${maxRetries} attempts.`);
                throw error;
            }
            
            const delay = baseDelayMs * Math.pow(2, attempt - 1); // Exponential backoff
            console.warn(`[RetryHandler] Operation failed. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
  }
}