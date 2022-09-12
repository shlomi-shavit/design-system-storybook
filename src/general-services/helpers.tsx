export const isUpperCase = ( string: string ) => /^[A-Z\s/]*$/.test( string );

export const removeWhiteSpace = ( str: string ) => str.replace( /\s/g, '' );

export const findIndexByKey = ( arrayOfObj: [], value: any ) => {
  const valueHandler = typeof value === 'object' ? Object.keys( value )[0] : value;
  return arrayOfObj?.findIndex( ( errorObj: any ) => Object.keys( errorObj )[0] === valueHandler );
};

export const startsWithSpace = ( string: string ) => {
  return string?.indexOf( string.trim() ) > 0;
};
