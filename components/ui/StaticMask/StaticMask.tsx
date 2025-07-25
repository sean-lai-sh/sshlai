import styles from './style.module.css'
export function StaticMaskText({phrases, style, delay}:{phrases: string[], style?:string, delay: number}) {
  
    return(
      <div className={`${style} h-[110%]`}>
        {
          phrases.map( (phrase, index) => {
            return <div key={index} className={styles.lineMask}>
              <p className={` ${index === 1 && ""}`} style={{ animation: 'slideUp 0.75s cubic-bezier(0.33, 1, 0.68, 1) forwards',
                animationDelay: `${index * 100 + delay}ms` }}>{phrase}</p>
            </div>
          })
        }
      </div>
    )
}
