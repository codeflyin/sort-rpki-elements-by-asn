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
    e.prefix = [e.prefix]

    if (final.filter(x => x.asn === e.asn).length > 0) {
      const k = final.findIndex(x => x.asn === e.asn)
      final[k].prefix.push(e.prefix)
      return
    } else {
      final.push(e)
    }

    return final

  })
}

getRpki()