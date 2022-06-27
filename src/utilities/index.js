export const changeAttribute = (attribute, change, {type, size}) => {
  if (type === 'image') {
    const url = change.sizes[size].url;
    return changeAttributeObject(attribute, url)
  }
  return changeAttributeObject(attribute, change)
}


const changeAttributeObject = (attribute, change) => {
  return { [attribute] : change }
}

