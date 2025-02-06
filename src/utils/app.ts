export const sleep = (ms: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const generateFileName = (prefix: string, extension: string): string => {
  const timestamp = Date.now();
  const result = `${ prefix }-${ timestamp }.${ extension }`;

  return result;
};

export const exportJsonToCSV = (
  data: any[], 
  filename = 'document.csv', 
  callback?: (success: boolean, message: string) => void
) => {
  if (!data.length) {
    const message = 'Tidak terdapat data untuk diekspor.';
    console.warn(message);
    callback?.(false, message);
    return;
  }

  try {
    const headers = Object.keys(data[0]).join(',');

    const csvRows = data.map((row) =>
      Object.values(row)
        .map((value) => `"${ String(value).replace(/"/g, '""') }"`)
        .join(',')
    );

    const csvContent = [
      headers,
      ...csvRows
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    callback?.(true, 'Data berhasil diunduh.');
  }
  catch (error) {
    console.error('Gagal mengekspor CSV:', error);
    callback?.(false, 'Gagal mengekspor CSV.');
  }
};

