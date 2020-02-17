const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFFFFFF'
        },
        sz: 14,
        bold: true,
        underline: true
      }
    }
  };

  const heading = [
    {value: 'Nama', style: styles.headerDark}, 
    {value: 'NIM', style: styles.headerDark}, 
    {value: 'Divisi', style: styles.headerDark}
    // ['a2', 'b2', 'c2'] // <-- It can be only values
  ];

  const specification = {
    Nama: { // <- the key should match the actual data key
      displayName: 'Nama', // <- Here you specify the column header
      headerStyle: styles.headerDark, // <- Header style
      width: 120 // <- width in pixels
    },
    NIM: {
      displayName: 'NIM',
      headerStyle: styles.headerDark,
      width: 120 // <- width in chars (when the number is passed as string)
    },
    Divisi: {
      displayName: 'Divisi',
      headerStyle: styles.headerDark,
    //   cellStyle: styles.cellPink, // <- Cell style
      width: 220 // <- width in pixels
    }
  }

  module.exports = {heading, specification}