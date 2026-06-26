// app/api/edades/[id]/route.js
import { NextResponse } from 'next/server';
import EdadModel from '../../../../models/edadModel';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await EdadModel.delete(id);
    return NextResponse.json({ message: 'Edad borrada con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al borrar edad' }, { status: 500 });
  }
}
