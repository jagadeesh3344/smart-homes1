import { Response } from 'express';

export type EventType = 
  | 'PRODUCT_CREATED'
  | 'PRODUCT_UPDATED'
  | 'PRODUCT_DELETED'
  | 'CATEGORY_MUTATED'
  | 'ORDER_PLACED'
  | 'ORDER_UPDATED'
  | 'CUSTOMER_REGISTERED'
  | 'CUSTOMER_UPDATED'
  | 'CUSTOMERS_UPDATED'
  | 'OFFER_MUTATED'
  | 'SETTINGS_MUTATED'
  | 'INVENTORY_CHANGED';

export interface SSEMessage {
  type: EventType;
  data: any;
  timestamp: string;
}

class EventStreamManager {
  private clients: Set<Response> = new Set();

  public addClient(res: Response): () => void {
    this.clients.add(res);
    console.log(`[SSE] Client connected. Total active streams: ${this.clients.size}`);

    // Send initial keepalive handshake
    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'Realtime SSE Stream Active', timestamp: new Date().toISOString() })}\n\n`);

    const cleanup = () => {
      this.clients.delete(res);
      console.log(`[SSE] Client disconnected. Remaining streams: ${this.clients.size}`);
    };

    return cleanup;
  }

  public broadcast(type: EventType, data: any): void {
    const payload: SSEMessage = {
      type,
      data,
      timestamp: new Date().toISOString()
    };

    const message = `data: ${JSON.stringify(payload)}\n\n`;
    console.log(`[SSE Broadcast] Event: ${type} to ${this.clients.size} clients`);

    for (const client of this.clients) {
      try {
        client.write(message);
      } catch (err) {
        console.error('[SSE] Error writing to client, removing:', err);
        this.clients.delete(client);
      }
    }
  }

  public getActiveClientCount(): number {
    return this.clients.size;
  }
}

export const eventStream = new EventStreamManager();
