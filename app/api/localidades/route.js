// app/api/localidades/route.js
import { NextResponse } from 'next/server';
import LocalidadModel from '../../../models/localidadModel';

// GET: Devuelve todas las localidades
export async function GET() {
  try {
    const localidades = await LocalidadModel.getAll();
    return NextResponse.json(localidades);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener localidades' }, { status: 500 });
  }
}

// POST: Crea una nueva localidad
export async function POST(request) {
  try {
    const { NOMBRE_LOCALIDAD } = await request.json();
    await LocalidadModel.create(NOMBRE_LOCALIDAD);
    return NextResponse.json({ message: 'Localidad creada con éxito' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear localidad' }, { status: 500 });
  }
}
