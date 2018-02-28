import { HttpHeaders } from '@angular/common/http';


export const apiUrl = 'https://localhost:8000/api/';

export const apiHeaders = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});

export const pusherKey = '4051662bb310056f8c60';
