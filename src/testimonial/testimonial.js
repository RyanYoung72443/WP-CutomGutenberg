const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { IconButton } = wp.components;

import { ReactComponent as Logo } from '../ga-logo.svg';
import { changeAttribute } from '../utilities'


registerBlockType('ga/testimonial', {
  title: 'GA Testimonial',
  icon: { src: Logo },
  category: 'gourmet-artist',
  attributes: {
    testimonialText: {
      type: 'string',
      source: 'html',
      selector: '.testimonial-block blockquote'
    },
    testimonialName: {
      type: 'string',
      source: 'html',
      selector: 'p'
    },
    testimonialImage: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: '.testimonial-info img'
    }
  },
  edit: (props) => {
    const { attributes: { testimonialText, testimonialName, testimonialImage }, setAttributes } = props;

    const onChangeAttribute = (attribute, change, type=null) => {
      const changes = changeAttribute(attribute, change, type);
      setAttributes(changes);
    }

    return(
      <div className="testimonial-block">
        <blockquote>
          <RichText
            placeholder='Add text for testimonial...'
            onChange={e => onChangeAttribute('testimonialText', e)}
            value={testimonialText}
          />
        </blockquote>
        <div class="testimonial-info">
          <img src={testimonialImage} />
          <MediaUpload 
            onSelect={e => onChangeAttribute('testimonialImage', e, { type:'image', size:'medium' })}
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
          <p>
            <RichText
              placeholder='Name... AnyCompany... Title...'
              onChange={e => onChangeAttribute('testimonialName', e)}
              value={testimonialName}
            />
          </p>
        </div>
      </div>
    );
  },
  save: (props) => {
    const { attributes: { testimonialText, testimonialName,  testimonialImage} } = props

    return(
      <div className="testimonial-block">
            <blockquote>
              <RichText.Content value={testimonialText} />
            </blockquote>
            <div class="testimonial-info">
                <img src={testimonialImage}/>
                <p><RichText.Content value={testimonialName} /></p>
            </div>
        </div>
    );
  }
})