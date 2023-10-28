import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date:string|Date){
  const inputDate = new Date(date);

  const dd = String(inputDate.getUTCDate()).padStart(2, "0"); // Day
  const mm = String(inputDate.getUTCMonth() + 1).padStart(2, "0"); // Month (add 1 because months are zero-based)
  const yy = String(inputDate.getUTCFullYear()).slice(-2); // Year (last two digits)

  const formattedDate = `${dd} ${mm} ${yy}`;
  return formattedDate
}