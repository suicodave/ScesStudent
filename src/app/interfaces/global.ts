import { HttpHeaders } from '@angular/common/http';


<<<<<<< HEAD
export const apiUrl = 'https://sces-api.herokuapp.com/api/';
=======
export const apiUrl = 'http://127.0.0.1:8000/api/';
>>>>>>> master

export const apiHeaders = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});

export const pusherKey = '068cb0ad7d41b29d066e';
