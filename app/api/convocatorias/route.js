// app/api/convocatorias/route.js
import { NextResponse } from 'next/server';
import ConvocatoriaModel from '../../../models/convocatoriaModel';

export async function GET() {
  try {
    const data = await ConvocatoriaModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener convocatorias' }, { status: 500 });
  }
}
