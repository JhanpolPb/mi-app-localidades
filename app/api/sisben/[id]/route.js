// app/api/sisben/[id]/route.js
import { NextResponse } from 'next/server';
import SisbenModel from '../../../../models/sisbenModel';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await SisbenModel.delete(id);
    return NextResponse.json({ message: 'Registro SISBEN borrado con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al borrar registro SISBEN' }, { status: 500 });
  }
}
