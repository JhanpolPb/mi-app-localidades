// app/api/programas/route.js
import { NextResponse } from 'next/server';
import ProgramaModel from '../../../models/programaModel';

export async function GET() {
  try {
    const data = await ProgramaModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener programas' }, { status: 500 });
  }
}
