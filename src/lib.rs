use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn prime_factorization(n: usize) -> Vec<usize> {
  fn push_number_to_array(number: usize, array: Vec<usize>) -> Vec<usize> {
    array.iter().chain([number].iter()).map(|&x| x).collect()
  }

  fn is_divisor_larger_than_sqrt_dividend(dividend: usize, divisor: usize) -> bool {
    divisor as f64 >= (dividend as f64).sqrt()
  }

  fn get_prime_number_array(dividend: usize, divisor: usize, result: Vec<usize>) -> Vec<usize> {
    match dividend {
      1 => result,
      _ => match dividend % divisor {
        0 => get_prime_number_array(
          dividend / divisor,
          divisor,
          push_number_to_array(divisor, result),
        ),
        _ => match is_divisor_larger_than_sqrt_dividend(dividend, divisor) {
          true => push_number_to_array(dividend, result),
          false => get_prime_number_array(dividend, divisor + 1, result),
        },
      },
    }
  }
  get_prime_number_array(n, 2, vec![])
}

#[cfg(test)]
mod tests {
  use super::*;
  #[test]
  fn it_works() {
    main();
    assert_eq!(prime_factorization(10), [2, 5]);
    assert_eq!(prime_factorization(111), [3, 37]);
    assert_eq!(prime_factorization(256), [2, 2, 2, 2, 2, 2, 2, 2]);
    assert_eq!(prime_factorization(1192), [2, 2, 2, 149]);
    assert_eq!(prime_factorization(114514), [2, 31, 1847]);
  }
}

fn fib_helper(n: i32, acc1: i64, acc2: i64) -> i64 {
  match n {
    n if n < 1 => acc1,
    _ => fib_helper(n - 1, acc1 + acc2, acc1),
  }
}

#[wasm_bindgen]
pub fn fib(n: i32) -> i64 {
  fib_helper(n, 0, 1)
}

#[cfg(test)]
mod tests {
  use super::*;
  #[test]
  fn it_works() {
    assert_eq!(fib(4), 3);
    assert_eq!(fib(10), 55);
  }
}
