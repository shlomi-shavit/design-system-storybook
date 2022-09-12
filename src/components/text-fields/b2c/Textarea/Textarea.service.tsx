import { useEffect, useState } from 'react';

const useService = ( isCarousel: boolean, greetingArray: string[], value: object, handleChange: any ) => {
  const [ greetingIndex, setGreetingIndex ] = useState<any>( 0 );

  const textareaValue = () => {
    if ( isCarousel && Object.values( value ).length === 0 ) {
      return greetingArray[greetingIndex];
    } else {
      return Object.values( value )[0];
    }
  };

  const greetingCarousel = ( action: number ) => {
    const maxIndex = greetingArray.length - 1;
    const carouselIndex: any = greetingIndex + action;

    setGreetingIndex(
      carouselIndex <= maxIndex && carouselIndex >= 0 ? carouselIndex : carouselIndex < 0 ? maxIndex : 0,
    );
  };

  useEffect( () => {
    handleChange( '', 'textarea', greetingArray[greetingIndex] );
  }, [ greetingIndex ] );

  return {
    greetingIndex,
    textareaValue,
    greetingCarousel,
  };
};

export default useService;
