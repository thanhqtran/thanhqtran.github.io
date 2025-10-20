---
layout: post
title: An estimation of the Hansen model for Vietnam
published: true
date: 2025-10-20
categories: [Modelling]
tags: [rbc]
---

This note applies the classic Hansen (1985, JME)[http://www.dklevine.com/archive/refs4233.pdf] on the Vietnamese economy.
Note that the economy is closed. There is no government or monetary authority.
All variables are measured in real value.
While it is highly stylized and maybe not suitable for a small open economy such as Vietnam, it is a useful example on how to assess the model and its applicability.
In preparation of the data, I used only the data of consumption, investment, and hours worked from the GSO. 
The domestic output is then constructed by adding consumption and investment together.

## Model

A representative household maximizes consumption $c_t$, hours worked $h_t$, and investment $i_t$:

$$
\max_{c_t, h_t, k_{t+1}} E_0 \sum_{t=0}^\infty \beta^t (\ln c_t - \gamma h_t) a_t
$$

subject to

$$
\begin{aligned}
c_t + i_t = w_t h_t + r_t k_t, \\
k_{t+1} = i_t + (1-\delta) k_t, \\
k_0 > 0
\end{aligned}
$$

The output is given by

$$
y_t = \theta_t k_t^\alpha h_t^{1-\alpha}
$$

Factor prices:

$$
\begin{aligned}
w_t = (1-\alpha) \theta_t k_t^{\alpha} h_t^{-\alpha} = (1-\alpha) \frac{y_t}{h_t}, \\
r_t = \alpha \theta_t k_t^{\alpha-1} h_t^{1-\alpha} = \alpha \frac{y_t}{k_t}.
\end{aligned}
$$

Furthermore, $a_t,\theta_t$ are structural shocks on demand and supply.

---

## Equilibrium condition

$$
\begin{aligned}
y_t = \theta_t k_t^\alpha h_t^{1-\alpha}, \\
\ln \theta_t = (1-\rho_\theta)\ln \bar{\theta} + \rho_\theta \ln \theta_{t-1} + \epsilon_t, \quad \epsilon_t \sim N(0,\sigma^2_\theta), \\
y_t = c_t + i_t, \\
k_{t+1} = (1-\delta)k_t + i_t, \\
\gamma c_t h_t = (1-\alpha) y_t, \\
\frac{a_t}{c_t} = \beta E_t \left[ \frac{a_{t+1}}{c_{t+1}} \left( \alpha \frac{y_{t+1}}{k_{t+1}} + 1 - \delta \right)\right], \\
\ln a_t = \rho_a \ln a_{t-1} + \xi_t, \quad \xi_t \sim N(0,\sigma^2_a)
\end{aligned}
$$

Note that we do not need $w_t$ here, and $r_{t+1}$ is substituted by a function of $y_{t+1},k_{t+1}$.

---

## Steady state

$$
\begin{align}
c_{ss} = \frac{1-\alpha}{\gamma} \bar{\theta} \left[ \frac{\bar{\theta}\alpha}{(1/\beta)-1+\delta} \right]^{\alpha/(1-\alpha)}, \\
k_{ss} = \frac{\alpha c_{ss}}{(1/\beta)-1+\delta -\alpha\delta}, \\
h_{ss} = k_{ss} \left[ \frac{(1/\beta)-1+\delta}{\bar{\theta}\alpha} \right]^{1/(1-\alpha)}, \\
y_{ss} = \bar{\theta} k_{ss}^\alpha h_{ss}^{1-\alpha}, \\
i_{ss} = y_{ss} - c_{ss}, \\
w_{ss} = (1-\alpha) \frac{y_{ss}}{h_{ss}}, \\
r_{ss} = \alpha \frac{y_{ss}}{k_{ss}} - 1.
\end{align}
$$

---

## Log-linearization

Define $\hat{x} = \ln x_t - \ln x_{ss}$, we have:

$$
\hat{y}_t = \hat{\theta}_t + \alpha \hat{k}_t + (1-\alpha)\hat{h}_t
$$


$$
\hat{\theta}_{t} = \rho_{\theta} \hat{\theta}_{t-1} + \epsilon_t
$$


$$
((1/\beta)-1+\delta)\hat{y}_t = ((1/\beta)-1+\delta-\alpha\delta) \hat{c}_t + \alpha\delta \hat{i}_t
$$


$$
\hat{k}_{t+1} = (1-\delta)\hat{k}_t + \delta \hat{i}_t
$$


$$
\hat{c}_t + \hat{h}_t = \hat{y}_t
$$


$$
(1/\beta) \hat{a}_{t} - (1/ \beta) \hat{c}_t = -(1/\beta) E_t \hat{c}_{t+1} + ((1/\beta)-1+\delta)(E_t\hat{y}_{t+1}-\hat{k}_{t+1}) + (1/\beta)E_t \hat{a}_{t+1}
$$


$$
\hat{a}_t = \rho_{a} \hat{a}_{t-1} + \xi_t.
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
\end{bmatrix} = 
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
\end{bmatrix} =
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
\begin{align}
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
\end{align}
$$

## Estimation

The estimation procedure follows Chapter 10 of [Novales, A., Fernández, E., Ruiz, J. (2022). Empirical Methods: Frequentist Estimation. In: Economic Growth. Springer Texts in Business and Economics. Springer, Berlin, Heidelberg.](https://doi.org/10.1007/978-3-662-63982-5_10).

[You can obtain the code here](https://www.ucm.es/fundamentos-analisis-economico2/economic-growth).

First, we estimate the trend of the data for output, consumption, and hours worked.

![](https://github.com/thanhqtran/thanhqtran.github.io/blob/7fd5950eb1e45395c6d024ef95572c179489d838/_posts/_assets/fig_trendvsdata.png)

Then, we can run the maximum likelihood estimation for structural parameters.

| Iteration | Func-count | f(x)      | Step-size     | Optimality |
|------------|-------------|-----------|----------------|-------------|
| 0  | 8  | 951478   | –            | 1.07e+06 |
| 1  | 16 | 71127.3  | 9.34793e-07  | 8.26e+04 |
| 2  | 24 | 57735.6  | 1            | 6.71e+04 |
| 3  | 32 | 23347.6  | 1            | 2.72e+04 |
| 4  | 40 | 12516.7  | 1            | 1.47e+04 |
| 5  | 48 | 5992.47  | 1            | 7.14e+03 |
| 6  | 56 | 2964.62  | 1            | 3.61e+03 |
| 7  | 64 | 1419.30  | 1            | 1.79e+03 |
| 8  | 72 | 665.733  | 1            | 884 |
| 9  | 80 | 298.288  | 1            | 427 |
| 10 | 88 | 125.398  | 1            | 198 |
| 11 | 96 | 48.5919  | 1            | 83.3 |

**Local minimum found.**

The estimated parameters are:


| Parameter                                         | Coefficient | Std. Error | t-statistic | p-value       |
|---------------------------------------------------|-------------|------------|-------------|---------------|
| Productivity shock mean ($\bar{\theta}$)          | 0.38993     | 0.050089   | 7.7848      | 6.8834e-15    |
| Productivity persistence ($\rho$)                 | 0.95931     | 0.025398   | 37.772      | 0             |
| Productivity innovation std ($\sigma_e$)          | 0.099209    | 0.013974   | 7.0997      | 1.2506e-12    |
| Preference shock persistence ($\rho_a$)           | 0.93936     | 0.01472    | 63.815      | 0             |
| Innovation of preference shock std ($\sigma_a$)   | 0.25173     | 0.0066917  | 37.619      | 0             |
| Output elasticity of capital ($\alpha$)           | 0.26933     | 0.013686   | 19.679      | 0             |
| Utility function parameter ($\gamma$)             | 0.013093    | 0.0012716  | 10.296      | 0             |

**Calibrated parameters**

Note that here, we did not estimate discount factor and the depreciation rate, so these parameters are calibrated.

| Parameter                 | Value    |
|---------------------------|----------|
| Discount factor ($\beta$) | 0.99269  |
| Depreciation rate ($\delta$) | 0.014677 |

To test the goodness of fit, we apply a Kalman filtration on output using consumption and hours. We will use the residuals from the Kalman filtration to simulate the model's dynamics using the estimated parameters.

![](https://github.com/thanhqtran/thanhqtran.github.io/blob/7fd5950eb1e45395c6d024ef95572c179489d838/_posts/_assets/fig_kalman.png)

Goodness-of-Fit for Output per Worker
Correlation: 0.6771
R-squared: 0.4584

One can also add back the trend components

![](https://github.com/thanhqtran/thanhqtran.github.io/blob/7fd5950eb1e45395c6d024ef95572c179489d838/_posts/_assets/fig_kalman2.png)

Now, an IRFs for supply and demand shocks can be generated

![](https://github.com/thanhqtran/thanhqtran.github.io/blob/7fd5950eb1e45395c6d024ef95572c179489d838/_posts/_assets/fig_irf.png)
