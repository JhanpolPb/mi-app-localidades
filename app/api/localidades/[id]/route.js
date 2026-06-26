// app/api/localidades/[id]/route.js
import { NextResponse } from 'next/server';
import LocalidadModel from '../../../../models/localidadModel';

// PUT: Actualiza una localidad específica
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { NOMBRE_LOCALIDAD } = await request.json();
    await LocalidadModel.update(id, NOMBRE_LOCALIDAD);
    return NextResponse.json({ message: 'Localidad actualizada con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar localidad' }, { status: 500 });
  }
}

// DELETE: Borra una localidad específica
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await LocalidadModel.delete(id);
    return NextResponse.json({ message: 'Localidad borrada con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al borrar localidad' }, { status: 500 });
  }
}
