const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton } = wp.components;

import { ReactComponent as Logo } from '../ga-logo.svg';
import { changeAttribute } from '../utilities'


registerBlockType('ga/hero', {
  title: 'GA Hero',
  icon: { src: Logo },
  category: 'gourmet-artist',
  attributes: {
    heroTitle: {
      type: 'string',
      source: 'html',
      selector: '.hero-block h1'
    },
    heroTagline: {
      type: 'string',
      source: 'html',
      selector: '.hero-block p'
    },
    heroImage: {
      type: 'string',
    },
    alignContent: {
      type: 'string',
      default: 'center'
    }
  },
  supports: {
    align: ['wide', 'full']
  },
  edit: props => {
    const { attributes: { heroTitle, heroTagline, heroImage, alignContent }, setAttributes } = props;

    const onChangeAttribute = (attribute, change, type=null) => {
      const changes = changeAttribute(attribute, change, type);
      setAttributes(changes);
    }

    const onChangeAlignment = newAlignment => {
      setAttributes({ alignContent : newAlignment });
    }
    return(
      <div class="hero-block" style={{backgroundImage:`url(${heroImage})`}}>
        <BlockControls>
          <AlignmentToolbar
            onChange={onChangeAlignment}
          />
        </BlockControls>
        <MediaUpload 
            onSelect={e => onChangeAttribute('heroImage', e, { type:'image', size:'full' })}
            type='image'
            render={({open}) => (
              <IconButton
                onClick={open}
                icon='format-image'
                showTooltip='true'
                label='Add Image'
              />
            )}
        />
        <h1>
          <RichText 
            placeholder="Add the Title"
            onChange={e => onChangeAttribute('heroTitle', e)}
            value={heroTitle}
            style={{textAlign: alignContent}}
          />
        </h1>
        <p>
          <RichText 
            placeholder="Add the paragraph"
            onChange={e => onChangeAttribute('heroTagline', e)}
            value={heroTagline}
            style={{textAlign: alignContent}}
          />
        </p>
      </div>
    );
  },
  save: props => {
    const { attributes: { heroTitle, heroTagline, heroImage, alignContent } } = props;
    return(
      <div class="hero-block" style={{backgroundImage:`url(${heroImage})`}}>
        <h1 style={{textAlign: alignContent}}>
          <RichText.Content value={heroTitle} />
        </h1>
        <p style={{textAlign: alignContent}}>
          <RichText.Content value={heroTagline} />
        </p>
      </div>
    );
  }
});