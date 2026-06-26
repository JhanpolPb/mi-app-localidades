// app/api/edades/route.js
import { NextResponse } from 'next/server';
import EdadModel from '../../../models/edadModel';

export async function GET() {
  try {
    const data = await EdadModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener edades' }, { status: 500 });
  }
}
