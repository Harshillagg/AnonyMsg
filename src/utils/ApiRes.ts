import { NextResponse } from "next/server";

export const ApiRes = (success:boolean, message:string, status:number) => {
    return NextResponse.json({
        success, 
        message 
    }, { status });
};