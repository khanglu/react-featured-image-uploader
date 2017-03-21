export default function getDataTransferFiles(event, isMultipleAllowed = true) {
  let dataTransferItemsList = [];
  if (event.dataTransfer) {
    const dt = event.dataTransfer;
    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files;
    } else if (dt.items && dt.items.length) {
      // During the drag even the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
      dataTransferItemsList = dt.items;
    }
  } else if (event.target && event.target.files) {
    dataTransferItemsList = event.target.files;
  }

  if (dataTransferItemsList.length > 0) {
    dataTransferItemsList = isMultipleAllowed ? dataTransferItemsList : [dataTransferItemsList[0]];
  }

  // Convert from DataTransferItemsList to the native Array
  return Array.prototype.slice.call(dataTransferItemsList);
}