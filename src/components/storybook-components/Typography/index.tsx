import { t } from 'i18next';

export const Typography = () => {
  return (
    <div>
      <div className='header-1'>{ t( 'typography.header-1' ) }</div>
      <div className='header-2'>{ t( 'typography.header-2' ) }</div>
      <div className='header-3'>{ t( 'typography.header-3' ) }</div>
      <div className='header-4'>{ t( 'typography.header-4' ) }</div>
      <hr />
      <div className='subtitle-1'>{ t( 'typography.subtitle-1' ) }</div>
      <div className='subtitle-1-bold'>{ t( 'typography.subtitle-1-bold' ) }</div>
      <hr />
      <div className='subtitle-2'>{ t( 'typography.subtitle-2' ) }</div>
      <div className='subtitle-2-bold'>{ t( 'typography.subtitle-2-bold' ) }</div>
      <hr />
      <div className='subtitle-3'>{ t( 'typography.subtitle-3' ) }</div>
      <div className='subtitle-3-bold'>{ t( 'typography.subtitle-3-bold' ) }</div>
      <hr />
      <div className='body'>{ t( 'typography.body' ) }</div>
      <div className='body-small'>{ t( 'typography.body-small' ) }</div>
      <hr />
      <div className='link'>{ t( 'typography.link' ) }</div>
      <hr />
      <div className='caption'>{ t( 'typography.caption' ) }</div>
      <hr />
      <div className='button-small'>{ t( 'typography.button-small' ) }</div>
      <div className='button-medium'>{ t( 'typography.button-medium' ) }</div>
      <div className='button-large'>{ t( 'typography.button-large' ) }</div>
      <hr />
    </div>
  );
};

export default Typography;
