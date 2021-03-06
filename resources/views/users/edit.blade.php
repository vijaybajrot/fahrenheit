@extends('layouts.app')

@section('content')
<div class="container" >
    <div class="panel panel-default">

        <div class="panel-heading clearfix">

         <!--    <div class="pull-left">
                <h4 class="mt-5 mb-5">
                        @can('isAdmin')
                    {{ !empty($users->name) ? $users->name : 'Users' }}
                    @endcan
                    @can('isUser')
                    <img src="{{ asset('images/cropped-flake-32x32.png') }}" class="pageheader" alt="fahrenheit" />My Profile
                    @endcan
                </h4>
            </div> -->
            <div class="btn-group btn-group-sm pull-right" role="group">

                <a href="#" onclick="javascript:window.history.go(-1);" class="btn btn-primary" title="{{ __('users.show_all_user')}}">
                    <span class="glyphicon glyphicon-th-list" aria-hidden="true">{{ __('users.back_button')}}</span>
                </a>
              <!--   @can('isAdmin')
                <a href="{{ route('users.users.create') }}" class="btn btn-success" title="Create New Users">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true">Add New</span>
                </a>
                @endcan -->

            </div>
        </div>

        <div class="panel-body">

            @if ($errors->any())
                <ul class="alert alert-danger">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            @endif

            <form method="POST" action="{{ route('users.users.update', $users->id) }}" id="edit_users_form" name="edit_users_form" accept-charset="UTF-8" class="form-horizontal">
            {{ csrf_field() }}
            <input name="_method" type="hidden" value="PUT">
            @include ('users.form', [
                                        'users' => $users,
                                        'mode' =>'edit'
                                      ])

                <div class="form-group">
                    <div class="col-md-offset-2 col-md-10">
                        <input class="btn btn-primary" type="submit" value="{{ __('users.update_button')}}">
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>
@endsection
