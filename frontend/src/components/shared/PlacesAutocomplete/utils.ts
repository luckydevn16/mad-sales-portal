const parseGeocodeResult = (result: google.maps.GeocoderResult) => {
  const country =
    result.address_components.find((d) => d.types.includes("country"))
      ?.short_name ?? "";

  const zipcode =
    result.address_components.find((d) => d.types.includes("postal_code"))
      ?.short_name ?? "";

  const state =
    result.address_components.find((d) =>
      d.types.includes("administrative_area_level_1")
    )?.short_name ?? "";

  const stateLn =
    result.address_components.find((d) =>
      d.types.includes("administrative_area_level_1")
    )?.long_name ?? "";

  const city =
    result.address_components.find((d) => d.types.includes("locality"))
      ?.short_name ?? "";

  const streetNumber =
    result.address_components.find((d) => d.types.includes("street_number"))
      ?.short_name ?? "";

  const route = result.address_components.find((d) =>
    d.types.includes("route")
  )?.short_name;

  const address = [streetNumber, route].join(" ");

  const latitude =
    Math.round(result.geometry.location.lat() * 10 ** 11) / 10 ** 11;

  const longitude =
    Math.round(result.geometry.location.lng() * 10 ** 11) / 10 ** 11;

  return {
    formattedAddress: result.formatted_address,
    country,
    address,
    city,
    state,
    stateLn,
    zipcode,
    latitude,
    longitude,
  };
};

export const getPredictions = (input: string): Promise<any> =>
  new Promise((resolve) => {
    const placeAutocompleteService =
      new window.google.maps.places.AutocompleteService();
    placeAutocompleteService.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: ["us", "ca"] },
        types: ["address"],
      },
      (results: any) => {
        resolve(results);
      }
    );
  });

export const getRichAddress = (fullAddress: string): Promise<any> =>
  new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: fullAddress },
      (results: google.maps.GeocoderResult[] | null) => {
        const result = (results as google.maps.GeocoderResult[])[0];
        const data = parseGeocodeResult(result);
        resolve(data);
      }
    );
  });

export const getQueryPredictions = (input: string): Promise<any> =>
  new Promise((resolve) => {
    const placeAutocompleteService =
      new window.google.maps.places.AutocompleteService();
    placeAutocompleteService.getQueryPredictions(
      {
        input,
      },
      (results: any) => {
        resolve(results);
      }
    );
  });
