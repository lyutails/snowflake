import { Component } from '@angular/core';
import { SnowflakeComponent } from '../threejs/snowflake/snowflake.component';

@Component({
  selector: 'app-home',
  imports: [SnowflakeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  status = '404';
  message = 'If no such route out there - try another way';
  link = 'or go home';
  backgroundImageURL = `url("./pics/shrine-bamboo-lantern-night-snow-torii-winter.jpg")`
}
