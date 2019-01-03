// Source code for index.js (processed with TypeScript)

(async () => {
  const fileSelect = document.getElementById('fileSelect')
  const fileElem = document.getElementById('fileElem')
  const fileList = document.getElementById('fileList')
  const imageTemplateBlock = document.getElementById('ImageTemplateBlock')
  const ratioEl = document.getElementById('RatioElement')
  const ratios = [0.25, 0.50, 1.00, 1.25, 1.50]
  let ratio = 1

  ratios.forEach(num => {
    const number = `${num.toFixed(2).toString()}x`
    const optionEl = document.createElement('option')
    optionEl.setAttribute('value', num)
    optionEl.innerText = number
    if (ratio === num) optionEl.setAttribute('selected', true)
    ratioEl.appendChild(optionEl)
  })

  ratioEl.onchange = () => (ratio = ratioEl.value)

  const getImageDimensionsFromBlob = blob => {
    return new Promise(resolve => {
      const imageObj = document.createElement('img')
      const url = URL.createObjectURL(blob)
      imageObj.onload = () => {
        URL.revokeObjectURL(url)
        resolve({
          width: imageObj.width,
          height: imageObj.height,
          image: imageObj
        })
      }
      imageObj.src = url
    })
  }

  const handleFiles = files => {
    fileList.innerHTML = ''
    if (!files.length) return

    Array(...files).forEach(async file => {
      const clone = document.importNode(imageTemplateBlock.content, true)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      const { width, height, image } = await getImageDimensionsFromBlob(file)

      const margin = Math.min((height / 10), (width / 10)) / ratio

      canvas.height = height + (margin * 2)
      canvas.width = width + (margin * 2)
      context.fillStyle = '#FFFFFF'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, margin, margin)

      canvas.toBlob(blob => {
        const imageEl = clone.querySelector('.image-padded')
        const url = URL.createObjectURL(blob)

        imageEl.onload = () => {
          fileList.appendChild(clone)
          // no longer need to read the blob so it's revoked
          // URL.revokeObjectURL(url)
        }

        imageEl.src = url
      })
    })
  }

  fileSelect.onclick = event => {
    fileElem.click(); event.preventDefault() // prevent navigation to "#"
  }

  fileElem.onchange = function () {
    handleFiles(this.files)
  }
})()
