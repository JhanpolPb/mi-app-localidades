// app/api/instituciones/route.js
import { NextResponse } from 'next/server';
import InstitucionModel from '../../../models/institucionModel';

export async function GET() {
  try {
    const data = await InstitucionModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener instituciones' }, { status: 500 });
  }
}
