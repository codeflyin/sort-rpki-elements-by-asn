const axios = require('axios')

const getRpki = async () => {
  try {
    const rpki = await axios.get('https://rpki.gin.ntt.net/api/export.json')
    const data = rpki.data.roas
    sortRpki(data)
  }
  catch (e) {
    throw e
  }
}

const sortRpki = (data) => {
  const final = []

  data.forEach(e => {

    if (final.filter(x => x.asn === e.asn).length > 0) {
      const k = final.findIndex(x => x.asn === e.asn)
      final[k].prefix.push(e.prefix)
    } else {
      e.prefix = [e.prefix]
      final.push(e)
    }
  })
  console.log(final)
  return final
}

getRpki()