<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.adcalc');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(
[
    'prefix' => 'users',
], function () {

    Route::get('/', 'UsersController@index')
         ->name('users.users.index')->middleware('auth');

    Route::get('/create','UsersController@create')
         ->name('users.users.create')->middleware('auth');

    Route::get('/show/{user}','UsersController@show')
         ->name('users.users.show')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::get('/{user}/edit','UsersController@edit')
         ->name('users.users.edit')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::post('/', 'UsersController@store')
         ->name('users.users.store')->middleware('auth');

    Route::put('user/{user}', 'UsersController@update')
         ->name('users.users.update')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::delete('/user/{user}','UsersController@destroy')
         ->name('users.users.destroy')
         ->where('id', '[0-9]+')->middleware('auth');
    Route::post('/updatestatus', 'UsersController@updatestatus');
    Route::post('/loginUser', 'UsersController@loginUser');

});

Route::group(
[
    'prefix' => 'user_types',
], function () {

    Route::get('/', 'UserTypesController@index')
         ->name('user_types.user_type.index')->middleware('auth');

    Route::get('/create','UserTypesController@create')
         ->name('user_types.user_type.create')->middleware('auth');

    Route::get('/show/{userType}','UserTypesController@show')
         ->name('user_types.user_type.show')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::get('/{userType}/edit','UserTypesController@edit')
         ->name('user_types.user_type.edit')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::post('/', 'UserTypesController@store')
         ->name('user_types.user_type.store')->middleware('auth');

    Route::put('user_type/{userType}', 'UserTypesController@update')
         ->name('user_types.user_type.update')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::delete('/user_type/{userType}','UserTypesController@destroy')
         ->name('user_types.user_type.destroy')
         ->where('id', '[0-9]+')->middleware('auth');

});

Route::group(
[
    'prefix' => 'user_reports',
], function () {

    Route::get('/', 'UserReportsController@index')
         ->name('user_reports.user_report.index')->middleware('auth');

    Route::get('/create','UserReportsController@create')
         ->name('user_reports.user_report.create')->middleware('auth');

    Route::get('/show/{userReport}','UserReportsController@show')
         ->name('user_reports.user_report.show')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::get('/{userReport}/edit','UserReportsController@edit')
         ->name('user_reports.user_report.edit')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::post('/', 'UserReportsController@store')
         ->name('user_reports.user_report.store')->middleware('auth');

    Route::put('user_report/{userReport}', 'UserReportsController@update')
         ->name('user_reports.user_report.update')
         ->where('id', '[0-9]+')->middleware('auth');

    Route::delete('/user_report/{userReport}','UserReportsController@destroy')
         ->name('user_reports.user_report.destroy')
         ->where('id', '[0-9]+')->middleware('auth');

});
