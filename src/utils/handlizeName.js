export const handlizeName = (name)=>{
    return name?.replace('(', ' ').replace(')',' ').split(' ').join('-')
}