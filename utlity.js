export const calculatePercent = (prihodi,rashod) => {
    let sum = prihodi.reduce((total,el) => total + el.value, 0)
    return rashod.value / sum * 100
} 