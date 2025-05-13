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
  message = 'No such route out there, try another way';
  link = 'or go home';
}
