Notes for the benchmark model of de la Croix's endogenous fertility and education model. This post mostly consists of mathematical derivations and important analytical results.  
[Link to the paper](https://www.aeaweb.org/articles?id=10.1257/000282803769206214)  
De La Croix, D., & Doepke, M. (2003). Inequality and growth: why differential fertility matters. American Economic Review, 93(4), 1091-1113.

# The Benchmark Model (p. 9)

## 1\. Setup

$$ U^i_t = \ln(c^i_t) + \gamma \ln(n^i_t \pi(e^i_t))$$ where \(U\) is the life-time utility, \(c\) is parent's consumption, \(n\) is number of children, \(\pi\) is the educational quality of each child. Parents enjoy utility from raising children.

The probability for a child to become skilled (B type): $$ \pi(e^i) = \mu^i (\theta + e^i)^\eta$$ where \(\mu\) is parent's type \((i)\), specifically \(\mu^B > \mu^A\) with B being high-skilled and A being low-skilled. High-skilled workers' children tend to become more educated than the low-skilled counterpart's. \(\theta\) is the natural ability of a kid (without parent's money for education) and \(e\) is education input a child receives.

Since \(1-\pi \) would be the prob. of a child becoming unskilled, the evolution of the population of each cohort is:

 $$ \begin{bmatrix} P^A_{t+1} \\ P^B_{t+1} \end{bmatrix} = \begin{bmatrix} n^A(1-\pi^A(e^A)) & n^B(1-\pi^B(e^B)) \\ n^A \pi^A(e^A) & n^B \pi^B(e^B) \end{bmatrix} \begin{bmatrix} P^A_t \\ P^B_t \end{bmatrix} $$

Parent's budget constraint: $$ c_t = w(1-\phi n_t) - n_t e_t$$ where \(\phi n\) is the fraction of time devoted to raise children and \(ne\) is cost of raising children.

Simple production function: $$ Y_t = w^A L^A + w^B L^B$$ where \(w\) is the wage-marginal product of labor, \(L\) is labor input.

In equilibirum: $$P^i_t(1-\phi n_t^i) = L^i_t$$ where \(P\) is type-specific population. The LHS is labor supply and RHS is labor demand.

## 2\. Solutions

(temporarily discard the superscript i notation)

Objective function: 

$$ \begin{align*} &\max_{c,e,n} U:= \ln(c) + \gamma\ln(n\mu(\theta+e)^\eta) \\ &\text{s.t. } c = w(1-\phi n) - ne \end{align*} $$

 Lagrangian: 

$$\mathcal{L} = \ln(c) + \gamma \ln(n\mu(\theta+e)^\eta) + \lambda (w(1-\phi n) - ne - c)$$ 

FOC:

 $$ \begin{align*} &(\frac{\partial \mathcal{L}}{\partial c}): c = \frac{1}{\lambda} \\ &(\frac{\partial \mathcal{L}}{\partial n}): \frac{\gamma}{n} = \lambda(w\theta+e) \iff n = \frac{\gamma}{\lambda(w\phi + e)} \\ &(\frac{\partial \mathcal{L}}{\partial e}): \frac{\gamma \eta (\theta+e)^{\eta-1}}{(\theta + e)^\eta} = \lambda n \\ &(\frac{\partial \mathcal{L}}{\partial \lambda}): c = w(1-\theta n) - ne \end{align*} $$ 

Plugging \(n\) into \(e\):

 $$ \begin{align*} &\frac{\gamma n}{\theta + e} = \frac{\gamma}{w\phi + e} \\ &\iff e = \frac{\eta w \phi - \theta}{1-\eta} \end{align*} $$ 

Plug this \( e \) and \( c \) back to \(n\) to get:

 $$ \begin{align*} &n = \frac{\gamma c}{w\phi + e} \\ &\iff n = \frac{\gamma [w-(w\phi+e)n]}{w\phi +e }\\ &\iff n = \frac{\gamma w}{(w\phi +e)(1+\gamma)} \\ &\iff n = \frac{\gamma w}{w\phi + \frac{\eta w \phi - \theta}{1-\eta} (1+\gamma)} \\ &\iff n = \frac{(1-\eta)\gamma w}{(w\phi - \theta)(1+\gamma)} \end{align*} $$ 

Now solve for \(c\): 

$$\begin{align*} &c=w(1-\phi n) - ne \\ &\iff c = w - \left(w\phi + \frac{\eta w \phi - \theta}{1-\eta}\right)\frac{(1-\eta)\gamma w}{(w\phi - \theta)(1+\gamma)} \\ &\iff c = w - \frac{\gamma}{1+\gamma}w = \frac{w}{1+\gamma} \end{align*}$$

## 3\. Comparative statics

We see that: $$ \frac{\partial e}{\partial w} = \frac{\eta \phi}{1-\eta} > 0 $$ Parental education spending increases with income. On the other hand: 

$$ \frac{\partial n}{\partial w} = - \theta \frac{(1-\eta)(1+\gamma)\gamma}{\left[(w\phi-\theta)(1+\gamma)\right]^2} < 0 $$ 

Fertility decreases with income.

\(e > 0\) if $$ w > \frac{\theta}{\eta \phi}$$ otherwise: if 

$$( e \leq 0 ) \begin{cases} &e=0 \\ &n = \frac{\gamma w}{w\phi (1+\gamma)} = \frac{\gamma}{\phi(1+\gamma)} \end{cases} $$

From here, we can calculate the range of \(n\):

For the lower bound: 

$$ \begin{align*} &\lim_{w\to \infty} n = \lim_{w\to \infty} \frac{(1-\eta)\gamma w}{(w\phi - \theta)(1+\gamma)}\\ &= \lim_{w\to \infty} \frac{(1-\eta)\gamma}{(\phi - \frac{\theta}{w})(1+\gamma)} = \frac{(1-\eta)\gamma}{\phi(1+\gamma)} \end{align*}$$ 

For the upper bound:

$$ \begin{align*} \frac{\lim_{w\to0} n}{\lim_{w\to\infty}n} = \frac{\frac{\gamma}{\phi(1+\gamma)}}{\frac{(1-\eta)\gamma}{\theta(1+\gamma)}} = \frac{1}{1-\eta} \end{align*} $$

