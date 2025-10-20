---
layout: post
title: An estimation of the Hansen model for Vietnam
published: true
date: 2025-10-20
categories: [Modelling]
tags: [rbc]
---

## Model

A representative household maximizes consumption $c_t$, hours worked $h_t$, and investment $i_t$:

$$
\max_{c_t, h_t, k_{t+1}} E_0 \sum_{t=0}^\infty \beta^t (\ln c_t - \gamma h_t) a_t
$$

subject to

$$
\begin{aligned}
c_t + i_t &= w_t h_t + r_t k_t, \\
k_{t+1} &= i_t + (1-\delta) k_t, \\
k_0 &> 0
\end{aligned}
$$

The output is given by

$$
y_t = \theta_t k_t^\alpha h_t^{1-\alpha}
$$

Factor prices:

$$
\begin{aligned}
w_t &= (1-\alpha) \theta_t k_t^{\alpha} h_t^{-\alpha} = (1-\alpha) \frac{y_t}{h_t}, \\
r_t &= \alpha \theta_t k_t^{\alpha-1} h_t^{1-\alpha} = \alpha \frac{y_t}{k_t}.
\end{aligned}
$$

Furthermore, $a_t,\theta_t$ are structural shocks on demand and supply.

---

## Equilibrium condition

$$
\begin{aligned}
y_t &= \theta_t k_t^\alpha h_t^{1-\alpha}, \\
\ln \theta_t &= (1-\rho_\theta)\ln \bar{\theta} + \rho_\theta \ln \theta_{t-1} + \epsilon_t, \quad \epsilon_t \sim N(0,\sigma^2_\theta), \\
y_t &= c_t + i_t, \\
k_{t+1} &= (1-\delta)k_t + i_t, \\
\gamma c_t h_t &= (1-\alpha) y_t, \\
\frac{a_t}{c_t} &= \beta E_t \left[ \frac{a_{t+1}}{c_{t+1}} \left( \alpha \frac{y_{t+1}}{k_{t+1}} + 1 - \delta \right)\right], \\
\ln a_t &= \rho_a \ln a_{t-1} + \xi_t, \quad \xi_t \sim N(0,\sigma^2_a)
\end{aligned}
$$

Note that we do not need $w_t$ here, and $r_{t+1}$ is substituted by a function of $y_{t+1},k_{t+1}$.

---

## Steady state

$$
\begin{aligned}
c_{ss} &= \frac{1-\alpha}{\gamma} \bar{\theta} \left[ \frac{\bar{\theta}\alpha}{(1/\beta)-1+\delta} \right]^{\alpha/(1-\alpha)}, \\
k_{ss} &= \frac{\alpha c_{ss}}{(1/\beta)-1+\delta -\alpha\delta}, \\
h_{ss} &= k_{ss} \left[ \frac{(1/\beta)-1+\delta}{\bar{\theta}\alpha} \right]^{1/(1-\alpha)}, \\
y_{ss} &= \bar{\theta} k_{ss}^\alpha h_{ss}^{1-\alpha}, \\
i_{ss} &= y_{ss} - c_{ss}, \\
w_{ss} &= (1-\alpha) \frac{y_{ss}}{h_{ss}}, \\
r_{ss} &= \alpha \frac{y_{ss}}{k_{ss}} - 1.
\end{aligned}
$$

---

## Log-linearization

Define $\hat{x} = \ln x_t - \ln x_{ss}$, we have:

$$
\begin{aligned}
\hat{y}_t &= \hat{\theta}_t + \alpha \hat{k}_t + (1-\alpha)\hat{h}_t, \\
\hat{\theta}_t &= \rho_\theta \hat{\theta}_{t-1} + \epsilon_t, \\
[(1/\beta)-1+\delta]\hat{y}_t &= [(1/\beta)-1+\delta-\alpha\delta] \hat{c}_t + \alpha\delta \hat{i}_t, \\
\hat{k}_{t+1} &= (1-\delta)\hat{k}_t + \delta \hat{i}_t, \\
\hat{c}_t + \hat{h}_t &= \hat{y}_t, \\
(1/\beta)\hat{a}_t - (1/\beta)\hat{c}_t &= -(1/\beta) E_t \hat{c}_{t+1} + [(1/\beta)-1+\delta](E_t\hat{y}_{t+1}-\hat{k}_{t+1}) + (1/\beta)E_t \hat{a}_{t+1}, \\
\hat{a}_t &= \rho_a \hat{a}_{t-1} + \xi_t.
\end{aligned}
$$

---

## State-space representation

The contemporary equations:

$$
\begin{bmatrix}
1 & 0 & \alpha - 1 \\
1/\beta - 1 + \delta & -\alpha\delta & 0 \\
1 & 0 & -1
\end{bmatrix}
\begin{bmatrix}
\hat{y}_t \\ \hat{i}_t \\ \hat{h}_t
\end{bmatrix}
=
\begin{bmatrix}
\alpha & 0 \\
0 & 1/\beta - 1 + \delta - \alpha\delta \\
0 & 1
\end{bmatrix}
\begin{bmatrix}
\hat{k}_t \\ \hat{c}_t
\end{bmatrix}
+
\begin{bmatrix}
1 & 0 \\ 0 & 0 \\ 0 & 0
\end{bmatrix}
\begin{bmatrix}
\hat{\theta}_t \\ \hat{a}_t
\end{bmatrix}
$$

and

$$
\begin{bmatrix}
E_t \hat{\theta}_{t+1} \\
E_t \hat{a}_{t+1}
\end{bmatrix}
=
\begin{bmatrix}
\rho_\theta & 0 \\
0 & \rho_a
\end{bmatrix}
\begin{bmatrix}
\hat{\theta}_t \\
\hat{a}_t
\end{bmatrix}
$$

The dynamic equations:

$$
\begin{aligned}
&\begin{bmatrix}
1 & 0 \\
1/\beta-1+\delta & 1/\beta
\end{bmatrix}
\begin{bmatrix}
\hat{k}_{t+1} \\ E_t \hat{c}_{t+1}
\end{bmatrix}
+ 
\begin{bmatrix}
0 & 0 & 0 \\
-(1/\beta-1+\delta) & 0 & 0
\end{bmatrix}
\begin{bmatrix}
E_t \hat{y}_{t+1} \\
E_t \hat{i}_{t+1} \\
E_t \hat{h}_{t+1}
\end{bmatrix}
= \\
&\begin{bmatrix}
1-\delta & 0 \\
0 & 1/\beta
\end{bmatrix}
\begin{bmatrix}
\hat{k}_t \\ \hat{c}_t
\end{bmatrix}
+ 
\begin{bmatrix}
0 & \delta & 0 \\
0 & 0 & 0
\end{bmatrix}
\begin{bmatrix}
\hat{y}_t \\ \hat{i}_t \\ \hat{h}_t
\end{bmatrix}
+
\begin{bmatrix}
0 & 0 \\
0 & (-1/\beta)(1-\rho_a)
\end{bmatrix}
\begin{bmatrix}
\hat{\theta}_t \\
\hat{a}_t
\end{bmatrix}
\end{aligned}
$$

## Estimation

The estimation procedure follows Chapter 10 of [Novales, A., Fernández, E., Ruiz, J. (2022). Empirical Methods: Frequentist Estimation. In: Economic Growth. Springer Texts in Business and Economics. Springer, Berlin, Heidelberg.](https://doi.org/10.1007/978-3-662-63982-5_10)

First, we estimate the trend of the data for output, consumption, and hours worked.

