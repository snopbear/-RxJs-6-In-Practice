import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';
import { createHttpObservable } from '../infra/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;
    constructor() {

    }

    ngOnInit() {


        const http$ = createHttpObservable('http://localhost:9000/api/courses');

        const courses$: Observable<Course[]> = http$.pipe(map(res => Object.values(res['payload'])));

        this.beginnerCourses$ = courses$.pipe(map(courses =>
            courses.filter(course => course.category === 'BEGINNER')));

        this.advancedCourses$ = courses$.pipe(map(courses =>
            courses.filter(course => course.category === 'ADVANCED')));


        // courses$.subscribe(courses => {
        //     this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
        //     this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
        // }, noop, () => console.log('complete'));

    }

}
