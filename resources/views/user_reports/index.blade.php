@extends('layouts.app')

@section('content')

    @if(Session::has('success_message'))
        <div class="alert alert-success">
            <span class="glyphicon glyphicon-ok"></span>
            {!! session('success_message') !!}

            <button type="button" class="close" data-dismiss="alert" aria-label="close">
                <span aria-hidden="true">&times;</span>
            </button>

        </div>
    @endif

    <div class="panel panel-default">

        <div class="panel-heading clearfix">

            <div class="pull-left">
                <h4 class="mt-5 mb-5"><img src="{{ asset('images/cropped-flake-32x32.png') }}" class="pageheader" alt="fahrenheit" />User Reports</h4>
            </div>

            <!-- <div class="btn-group btn-group-sm pull-right" role="group">
                <a href="{{ route('user_reports.user_report.create') }}" class="btn btn-success" title="Create New User Report">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true">Add New</span>
                </a>
            </div> -->

        </div>

        @if(count($userReports) == 0)
            <div class="panel-body text-center">
                <h4>No User Reports Available!</h4>
            </div>
        @else
        <div class="panel-body panel-body-with-table">
            <div class="table-responsive">

                <table class="table table-striped ">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>PDF</th>
                            <th>User</th>
                            <th>Company Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($userReports as $userReport)
                        <tr>
                            <td>{{ $userReport->timestamp->format('m.d.y H:m') }}</td>
                            <td>{{ $userReport->title }}</td>
                            <td>{{ optional($userReport->user)->name }}</td>
                            <td>{{ optional($userReport->user)->company }}</td>


                            <td>

                                <form method="POST" action="{!! route('user_reports.user_report.destroy', $userReport->id) !!}" accept-charset="UTF-8">
                                <input name="_method" value="DELETE" type="hidden">
                                {{ csrf_field() }}

                                    <div class="btn-group btn-group-xs pull-right" role="group">
                                        <a href="{{ route('user_reports.user_report.show', $userReport->id ) }}" class="btn btn-info" title="Show User Report">
                                            <span class="glyphicon glyphicon-eye-open" aria-hidden="true">View</span>
                                        </a>
                                        <a href="{{ route('user_reports.user_report.edit', $userReport->id ) }}" class="btn btn-primary" title="Edit User Report">
                                            <span class="glyphicon glyphicon-pencil" aria-hidden="true">Edit</span>
                                        </a>

                                        <button type="button" class="btn btn-danger" title="Delete User Report" data-toggle="modal" data-target="#delete-modal">
                                            <span class="glyphicon glyphicon glyphicon-trash" aria-hidden="true">Delete</span>
                                        </button>
                                    </div>

                                </form>

                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>

            </div>
        </div>

        <div class="panel-footer">
            {!! $userReports->render() !!}
        </div>

        @endif

    </div>
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="delete-modal">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel"><img src="{{ asset('images/fahrenheit_logo.png') }}" alt=""></h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                </div>
                <div class="modal-body">
                        Are you sure you want to delete the report? Please Confirm by clicking Yes.
                </div>
                <div class="modal-footer">
                        <form method="POST" action="{!! route('user_reports.user_report.destroy', $userReport->id) !!}" accept-charset="UTF-8">
                                <input name="_method" value="DELETE" type="hidden">
                                {{ csrf_field() }}
                  <button type="submit" class="btn btn-danger" title="Delete User Report">Yes</button>
                </form>
                  <button type="button" class="btn btn-primary" id="modal-btn-no"  data-dismiss="modal">No</button>
                </div>
              </div>
            </div>
          </div>
@endsection
