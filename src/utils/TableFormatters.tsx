import { GridValueFormatterParams } from "@mui/x-data-grid";

export const dateFormatter = (params: GridValueFormatterParams<string>) => {
    if (params.value == null) {
      return '';
    }
    return new Date(Number.parseInt(params.value)).toLocaleDateString()
  }