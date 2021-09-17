import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(0);


  const getMovies = async () => {
    var myHeaders = new Headers();
    myHeaders.append("user-public-notificacoes", "Za4qNXdyQNSa9YaA");
    myHeaders.append("Authorization", "Basic aW11bml6YWNhb19wdWJsaWM6cWx0bzV0JjdyX0ArI1Rsc3RpZ2k=");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ELASTIC-PROD=1631832783.831.611.918711");

    var raw = JSON.stringify({
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "vacina_descricao_dose": {
                  "query": "    2ª Dose",
                  "operator": "and"
                }
              }
            },
            {
              "match": {
                "estabelecimento_municipio_codigo": {
                  "query": "317020",
                  "operator": "and"
                }
              }
            }
          ]
        }
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  try {
    const response = await fetch("https://imunizacao-es.saude.gov.br/_count", requestOptions);
    const json = await response.json();
    console.log(JSON.stringify(json));
    setData(json.count);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  getMovies();
}, []);

return (
  <View style={{ flex: 1, padding: 24 }}>
    {isLoading ? <ActivityIndicator /> : (
     <Text>{data}</Text>
    )}
  </View>
);
};