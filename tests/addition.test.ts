import addition from "../src/utils/addition"

test("addition de 1 et 2 doit donner 3", () => {
   expect(addition(1, 2)).toBe(3)
})

test("addition de -1 et 1 doit donner 0", () => {
   expect(addition(-1, 1)).toBe(0)
})
