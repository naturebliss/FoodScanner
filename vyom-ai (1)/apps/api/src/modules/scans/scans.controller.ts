import { Controller, Get, Query, Sse, MessageEvent } from '@nestjs/common';
import { Observable, fromEvent, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { EventSource } from 'eventsource';

@Controller('scans')
export class ScansController {
  constructor(private config: ConfigService) {}

  @Sse('stream')
  stream(@Query('q') q: string): Observable<MessageEvent> {
    const aiUrl = this.config.get('AI_URL') || 'http://localhost:8000';
    const streamUrl = `${aiUrl}/v1/analyze/stream?q=${encodeURIComponent(q)}`;
    
    const eventSource = new EventSource(streamUrl);
    
    return fromEvent(eventSource, 'message').pipe(
      map((event: any) => ({
        data: JSON.parse(event.data),
        type: 'message'
      } as MessageEvent))
    );
  }

  @Get('sync')
  async sync(@Query('q') q: string) {
    const aiUrl = this.config.get('AI_URL') || 'http://localhost:8000';
    const resp = await fetch(`${aiUrl}/v1/analyze/sync?q=${encodeURIComponent(q)}`);
    return resp.json();
  }
}
