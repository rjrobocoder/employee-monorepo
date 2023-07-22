<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'profile' => 'image|max:2048',
            'email' => 'required|email|unique:employees,email',
            'status' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(['name', 'email', 'status']);

        if ($request->hasFile('profile')) {
            $fileName = $request->file('profile')->getClientOriginalName();
            $filePath = 'logos/' . $fileName;
            Storage::disk('local')->put($filePath, file_get_contents($request->file('profile')));
            $data['profile'] = $filePath;
        }
        $employee = Employee::create($data);
        return response()->json("The employee has been created successfully", 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $employee = Employee::findOrFail($id);
            return response()->json($employee);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string',
            'profile' => 'sometimes|image|max:2048',
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('employees')->ignore($id),
            ],
            'status' => 'sometimes|required|in:active,inactive',
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $employee = Employee::findOrFail($id);
            $data = $request->only(['name', 'email', 'status']);
            if ($request->hasFile('profile')) {
                $fileName = $request->file('profile')->getClientOriginalName();
                $filePath = 'logos/' . $fileName;
                Storage::disk('local')->put($filePath, file_get_contents($request->file('profile')));
                $data['profile'] = $filePath;
            }
            $employee->update($data);
            return response()->json("The employee has been updated successfully", 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        try {
            $employee = Employee::findOrFail($id);
            $employee->delete();
            return response()->json("The employee has been deleted successfully", 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
