/**
 * DoorDesignerApi.js
 * 
 * Service layer for the Entrance Door Portal composite door designer.
 * 
 * Uses a hidden WebView as an API bridge because the WCF service uses
 * ASP.NET session cookies that React Native's fetch() cannot reliably manage.
 * The WebView handles cookie persistence natively, just like a browser.
 */

const BASE_URL = 'https://www.entrancedoorportal.co.uk';
const SERVICE_PATH = 'Service/CompositeDoorService.svc';
const INIT_PAGE = `${BASE_URL}/BrandedDoorDesigner.aspx?Code=1BRA02`;

// Option category IDs (from the original designer's common.js)
export const OptionCategories = {
  FrameDesign: 101,
  DoorRange: 66,
  DoorDesign: 11,
  DoorGlass: 12,
  DoorHingesOn: 13,
  DoorOpening: 14,
  DoorColourExternal: 9,
  DoorColourInternal: 10,
  FrameColour: 27,
  HardwareColour: 35,
  HardwareHandle: 17,
  HardwareLetterplate: 20,
  HardwareKnocker: 19,
  SideSlabType: 94,
};

// Wizard step order
export const WIZARD_STEPS = [
  { id: 1, label: 'Door', category: OptionCategories.FrameDesign },
  { id: 2, label: 'Range', category: OptionCategories.DoorRange },
  { id: 3, label: 'Style', category: OptionCategories.DoorDesign },
  { id: 4, label: 'Ext. Colour', category: OptionCategories.DoorColourExternal },
  { id: 5, label: 'Int. Colour', category: OptionCategories.DoorColourInternal },
  { id: 6, label: 'Frame', category: OptionCategories.FrameColour },
  { id: 7, label: 'Glass', category: OptionCategories.DoorGlass },
  { id: 8, label: 'Handing', category: OptionCategories.DoorHingesOn },
  { id: 9, label: 'Opening', category: OptionCategories.DoorOpening },
  { id: 10, label: 'Finish', category: null }, // Summary/hardware step
];

export const EMPTY_GUID_VALUE = '00000000-0000-0000-0000-000000000000';

/**
 * Build a URL to fetch a stored image by its GUID.
 */
export const getStoredImageUrl = (storedImageID, imageLibraryVersion = '1') => {
  if (!storedImageID || storedImageID === EMPTY_GUID_VALUE) return null;
  return `${BASE_URL}/GetStoredImage.ashx?ID=${storedImageID}&ver=${imageLibraryVersion}`;
};

/**
 * Find a heading (option category) in the job data.
 */
export const findHeading = (job, categoryId, dataLinkID) => {
  if (!job?.Headings) return null;
  if (dataLinkID && dataLinkID !== EMPTY_GUID_VALUE) {
    return job.Headings.find(
      h => h.HeadingTypeID === categoryId && h.DataLinkID === dataLinkID
    ) || null;
  }
  return job.Headings.find(h => h.HeadingTypeID === categoryId) || null;
};

/**
 * Get the summary description for a given category from the job.
 */
export const getSelectedDescription = (job, categoryId) => {
  const heading = findHeading(job, categoryId);
  return heading?.OptionSelectedDescription || null;
};

/**
 * Generate JavaScript to inject into the hidden WebView to call the API.
 * The WebView acts as our cookie-aware HTTP client.
 */
export const generateStartDoorJS = () => `
  (function() {
    fetch('${BASE_URL}/${SERVICE_PATH}/StartDoor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ isRetailMode: true }),
      credentials: 'include'
    })
    .then(r => r.json())
    .then(data => {
      var result = data.StartDoorResult;
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'StartDoor',
        responseType: result.ResponseType,
        message: result.Message || '',
        data: result.Response
      }));
    })
    .catch(e => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'StartDoor',
        responseType: -1,
        message: e.message,
        data: null
      }));
    });
  })();
  true;
`;

export const generateUpdateOptionJS = (optionCategory, optionID, dataLinkID = EMPTY_GUID_VALUE, textValue = '') => `
  (function() {
    fetch('${BASE_URL}/${SERVICE_PATH}/UpdateOption', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        optionCategory: ${optionCategory},
        optionID: '${optionID}',
        dataLinkID: '${dataLinkID}',
        textValue: '${textValue}'
      }),
      credentials: 'include'
    })
    .then(r => r.json())
    .then(data => {
      var result = data.UpdateOptionResult;
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'UpdateOption',
        responseType: result.ResponseType,
        message: result.Message || '',
        data: result.Response
      }));
    })
    .catch(e => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'UpdateOption',
        responseType: -1,
        message: e.message,
        data: null
      }));
    });
  })();
  true;
`;

export const generateToggleViewJS = () => `
  (function() {
    fetch('${BASE_URL}/${SERVICE_PATH}/ToggleViewPosition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: '{}',
      credentials: 'include'
    })
    .then(r => r.json())
    .then(data => {
      var result = data.ToggleViewPositionResult;
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'ToggleViewPosition',
        responseType: result.ResponseType,
        message: result.Message || '',
        data: result.Response
      }));
    })
    .catch(e => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'ToggleViewPosition',
        responseType: -1,
        message: e.message,
        data: null
      }));
    });
  })();
  true;
`;

export const generateSubmitEnquiryJS = ({ name, email, postcode, phone, feedback }) => `
  (function() {
    fetch('${BASE_URL}/${SERVICE_PATH}/SubmitEnquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        EnquiryName: ${JSON.stringify(name)},
        EnquiryEmail: ${JSON.stringify(email)},
        EnquiryPostcode: ${JSON.stringify(postcode)},
        EnquiryPhone: ${JSON.stringify(phone)},
        EnquiryFeedback: ${JSON.stringify(feedback)}
      }),
      credentials: 'include'
    })
    .then(r => r.json())
    .then(data => {
      var result = data.SubmitEnquiryResult;
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SubmitEnquiry',
        responseType: result.ResponseType,
        message: result.ErrorMessage || result.Message || '',
        data: null
      }));
    })
    .catch(e => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SubmitEnquiry',
        responseType: -1,
        message: e.message,
        data: null
      }));
    });
  })();
  true;
`;

/** The URL the hidden WebView should load to establish the session */
export const SESSION_PAGE_URL = INIT_PAGE;

/** Base URL for image references in SVGs */
export const IMAGE_BASE_URL = BASE_URL;
