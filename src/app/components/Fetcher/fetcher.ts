export const fetcher = async (apiURL: string) => {
    return await fetch(apiURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Response isn`t ok");
        }
        return res.json();
      })
      .then((data: any) => {
        return data;
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
