import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  constructor() {}

  soundClickPrimary(): void {
    const urlSound = '../../assets/sound/clickb7.mp3';
    this.createSound(urlSound);
  }

  createSound(urlSound: string): void {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = urlSound;
    audio.play();
  }

  soundClickSecondary(): void {
    const urlSound = '../../assets/sound/sell1.mp3';
    this.createSound(urlSound);
  }

  soundAnimationTrashCan(): void {}
}
