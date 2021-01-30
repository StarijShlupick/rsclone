import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  constructor() {}

  playSound(urlSound: string): void {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = urlSound;
    audio.play();
  }
}
