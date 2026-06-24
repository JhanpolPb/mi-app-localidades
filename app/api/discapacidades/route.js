// app/api/discapacidades/route.js
import { NextResponse } from 'next/server';
import DiscapacidadModel from '../../../models/discapacidadModel';

export async function GET() {
  try {
    const data = await DiscapacidadModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener discapacidades' }, { status: 500 });
  }
}
