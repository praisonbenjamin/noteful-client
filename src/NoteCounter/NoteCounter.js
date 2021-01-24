export const countNotesForFolder = (notes=[], folderid) =>
  notes.filter(note => {
    return note.assigned_folder === folderid}).length