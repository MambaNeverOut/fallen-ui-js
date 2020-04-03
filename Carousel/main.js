    const css = ($node, cssObj) => Object.assign($node.style, cssObj)
    const Animation = {
      slide($from, $to, direction) {
        $from.style = ''
        $to.style = ''
        css($from, {
          transform: `translateX(0)`,
          zIndex: 10
        })
        css($to, {
          transform: `translateX(${direction === 'left' ? '' : '-'}100%)`,
          zIndex: 10
        })
        setTimeout(() => {
          css($from, {
            transform: `translateX(${direction === 'left' ? '-' : ''}100%)`,
            transition: `all .4s`
          })
          css($to, {
            transform: `translateX(0)`,
            transition: `all .4s`
          })
        })
      },
      fade($from, $to) {
        $from.style = ''
        $to.style = ''
        css($from, {
          zIndex: 10,
          opacity: 1
        })
        css($to, {
          zIndex: 9,
          opacity: 0
        })
        setTimeout(() => {
          css($from, {
            opacity: 0,
            zIndex: 10,
            transition: `all .4s`

          })
          css($to, {
            opacity: 1,
            zIndex: 9,
            transition: `all .4s`
          })
        })
        setTimeout(() => {
          css($from, {
            zIndex: 9
          })
          css($to, {
            zIndex: 10
          })
        }, 400)
      },
      zoom($from, $to) {
        $from.style = ''
        $to.style = ''
        css($from, {
          transform: `scale(1)`,
          opacity: 1,
          zIndex: 10
        })
        css($to, {
          transform: `scale(10)`,
          opacity: 0,
          zIndex: 9
        })
        setTimeout(() => {
          css($from, {
            transform: `scale(10)`,
            opacity: 0,
            zIndex: 10,
            transition: `all .4s`
          })
          css($to, {
            transform: `scale(1)`,
            opacity: 1,
            zIndex: 9,
            transition: `all .4s`
          })
        })
        setTimeout(() => {
          css($from, {
            zIndex: 9
          })
          css($to, {
            zIndex: 10
          })
        }, 400)
      }
    }

    class Carousel {
      constructor($root, animation) {
        this.$root = $root
        this.$pre = $root.querySelector('.arrow-pre')
        this.$next = $root.querySelector('.arrow-next')
        this.$$indicators = $root.querySelectorAll('.indicators > li')
        this.$$panels = $root.querySelectorAll('.panels > a')
        this.animation = animation
        this.bind()
      }
      bind() {
        // 可以提前绑定this
        // this.$pre.onclick = this.onPreClicked.bind(this)
        // 也可以使用箭头函数
        this.$pre.onclick = () => {
          let fromIndex = this.getIndex()
          let toIndex = this.getPreIndex()
          this.setPage(fromIndex, toIndex, 'left')
          this.setIndicators(toIndex)
        }
        this.$next.onclick = () => {
          let fromIndex = this.getIndex()
          let toIndex = this.getNextIndex()
          this.setPage(fromIndex, toIndex, 'right')
          this.setIndicators(toIndex)
        }
        this.$$indicators.forEach($indicator => {
          $indicator.onclick = (e) => {
            let fromIndex = this.getIndex()
            let toIndex = [...this.$$indicators].indexOf(e.target)
            let direction = fromIndex < toIndex ? 'left' : 'right'
            this.setIndicators(toIndex)
            this.setPage(fromIndex, toIndex, direction)
          }
        })
      }
      getIndex() {
        const $active = this.$root.querySelector('.indicators .active');
        return [...this.$$indicators].indexOf($active)
      }
      getPreIndex() {
        let index = this.getIndex()
        return (index - 1 + this.$$indicators.length) % this.$$indicators.length
      }
      getNextIndex() {
        let index = this.getIndex()
        return (index + 1) % this.$$indicators.length
      }
      setPage(fromIndex, toIndex, direction) {
        this.animation(this.$$panels[fromIndex], this.$$panels[toIndex], direction)
        // this.$$panels.forEach($panel => {
        //   $panel.classList.remove('active')
        //   this.$$panels[toIndex].classList.add('active')
        // })
      }
      setIndicators(toIndex) {
        this.$$indicators.forEach($indicator => {
          $indicator.classList.remove('active')
          this.$$indicators[toIndex].classList.add('active')
        })
      }
      setAnimation(animation) {
        this.animation = animation
      }
    }
    let $carousel = document.querySelector('.carousel')
    let carousel = new Carousel($carousel, Animation.slide)

    document.querySelector('#animation-select').onchange = function () {
      carousel.setAnimation(Animation[this.value])
    }